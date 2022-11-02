import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { ifProp, theme } from 'styled-tools';

//image imports
import PaginationPrevIcon from '../Icon/PaginationPrevIcon';
import PaginationNextIcon from '../Icon/PaginationNextIcon';

interface IPaginationProps {
	totalLength: number;
	numberPerPage: number;
	currentIndex: number;
	onClick: (index: number) => void;
}

interface IPaginationState {
	currentPage: number;
	totalPage: number;
}

enum EChangePageEvent {
	PREVIOUS,
	NEXT,
	GOTO,
}
class Pagination extends Component<IPaginationProps, IPaginationState> {
	static getDerivedStateFromProps(nextProps: IPaginationProps, prevState: IPaginationState) {
		const { totalLength, onClick, numberPerPage }: IPaginationProps = nextProps;
		const totalPage = Math.ceil(totalLength / numberPerPage) || 1;
		if (totalPage < prevState.currentPage) {
			onClick && onClick(1);
			return {
				currentPage: 1,
			};
		}
		return {
			totalPage,
		};
	}

	constructor(props: IPaginationProps) {
		super(props);

		this.state = {
			currentPage: props.currentIndex,
			totalPage: Math.ceil(props.totalLength / props.numberPerPage) || 1,
		};
	}

	handleChangePageClick = (changeEvent: EChangePageEvent, pageIndex: number = 1): any => (): void => {
		const { currentPage, totalPage }: IPaginationState = this.state;
		switch (changeEvent) {
			case EChangePageEvent.PREVIOUS:
				if (currentPage > 1) {
					this.setState({
						currentPage: currentPage - 1,
					});
				}
				break;
			case EChangePageEvent.NEXT:
				if (currentPage < totalPage) {
					this.setState({
						currentPage: currentPage + 1,
					});
				}
				break;
			case EChangePageEvent.GOTO:
				if (currentPage > 0 && currentPage < totalPage + 1) {
					this.setState({
						currentPage: pageIndex,
					});
				}
				break;
			default:
				this.setState({
					currentPage: 1,
				});
		}
	};

	componentDidUpdate(prevProps: IPaginationProps, prevState: IPaginationState) {
		const { currentPage }: IPaginationState = this.state;
		if (prevState.currentPage !== currentPage) {
			const { onClick }: IPaginationProps = this.props;
			onClick && onClick(currentPage);
		}
	}

	getPaginationNumberCells = () => {
		const { currentPage, totalPage }: IPaginationState = this.state;
		const prevPage = currentPage - 1;
		const prev2Page = currentPage - 2;
		const nextPage = currentPage + 1;
		const next2Page = currentPage + 2;

		const numberCell = [];

		if (currentPage !== 1 && prev2Page > 1) {
			numberCell.push(
				<PageNumberCell onClick={this.handleChangePageClick(EChangePageEvent.GOTO, 1)} key={'pagination_1'}>
					{1}
				</PageNumberCell>,
			);
		}

		if (prev2Page > 2) {
			numberCell.push(<PageNumberCell key={'pagination_pre_ellipsis'}>{'...'}</PageNumberCell>);
		}

		if (prev2Page >= 1) {
			numberCell.push(
				<PageNumberCell
					onClick={this.handleChangePageClick(EChangePageEvent.GOTO, prev2Page)}
					key={`pagination_${prev2Page}`}
				>
					{prev2Page}
				</PageNumberCell>,
			);
		}

		if (prevPage >= 1) {
			numberCell.push(
				<PageNumberCell
					onClick={this.handleChangePageClick(EChangePageEvent.GOTO, prevPage)}
					key={`pagination_${prevPage}`}
				>
					{prevPage}
				</PageNumberCell>,
			);
		}

		numberCell.push(
			<PageNumberCell
				onClick={this.handleChangePageClick(EChangePageEvent.GOTO, currentPage)}
				current
				key={`pagination_${currentPage}`}
			>
				{currentPage}
			</PageNumberCell>,
		);

		if (nextPage <= totalPage) {
			numberCell.push(
				<PageNumberCell
					onClick={this.handleChangePageClick(EChangePageEvent.GOTO, nextPage)}
					key={`pagination_${nextPage}`}
				>
					{nextPage}
				</PageNumberCell>,
			);
		}

		if (next2Page <= totalPage) {
			numberCell.push(
				<PageNumberCell
					onClick={this.handleChangePageClick(EChangePageEvent.GOTO, next2Page)}
					key={`pagination_${next2Page}`}
				>
					{next2Page}
				</PageNumberCell>,
			);
		}

		if (next2Page < totalPage - 1) {
			numberCell.push(<PageNumberCell key={'pagination_next_ellipsis'}>{'...'}</PageNumberCell>);
		}

		if (currentPage !== totalPage && next2Page < totalPage) {
			numberCell.push(
				<PageNumberCell
					onClick={this.handleChangePageClick(EChangePageEvent.GOTO, totalPage)}
					key={`pagination_${totalPage}`}
				>
					{totalPage}
				</PageNumberCell>,
			);
		}

		return numberCell;
	};

	render() {
		return (
			<React.Fragment>
				<PageCount>
					<PreviousIcon onClick={this.handleChangePageClick(EChangePageEvent.PREVIOUS)}>
						<PaginationPrevIcon />
					</PreviousIcon>
					{this.getPaginationNumberCells()}
					<NextIcon onClick={this.handleChangePageClick(EChangePageEvent.NEXT)}>
                        <PaginationNextIcon />
					</NextIcon>
				</PageCount>
			</React.Fragment>
		);
	}
}

const NextIcon = styled.div`
    border-radius: 5px;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
	cursor: pointer;

	span {
		width: 10px;
		height: 10px;
		display: inline-block;
		border-style: solid;
		border-color: #778AA5;
		border-width: 0 2px 2px 0;
		padding: 2.5px;
		vertical-align: middle;
		transition: transform 0.3s;
		transform: rotate(315deg);
	}

	:hover {
		background: #e7e7ef97;
	}
`;

const PreviousIcon = styled.div`
    border-radius: 5px;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
	cursor: pointer;

	span {
		width: 10px;
		height: 10px;
		display: inline-block;
		border-style: solid;
		border-color: #778AA5;
		border-width: 0 2px 2px 0;
		padding: 2.5px;
		vertical-align: middle;
		transition: transform 0.3s;
		transform: rotate(135deg);
	}

	:hover {
		background: #e7e7ef97;
	}
`;

const TextContent = styled.div`
	text-transform: uppercase;
	color: #4F6380;
	font-weight: 600;
	font-size: 14px;
`;

const PageCount = styled.div`
	display: flex;
	align-items: center;
    justify-content: center;
    gap: 10px;
`;

const PageNumberCell: any = styled.div`
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
	flex-shrink: 0;
	color: #4F6380;
	background: #FFFFFF;
    border-radius: 5px;
	
	${ifProp(
	'current',
	css`
			/* color: ${theme('palette.paginationNmbrColor')}; */
			color: #000;
		`,
	css`
			/* color: ${theme('palette.pageColorNumber')}; */
			color: #4F6380;
			cursor: pointer;
		`,
)};
`;

export default Pagination;
