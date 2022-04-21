import { Card, Pagination } from "react-bootstrap";
import React, { Component } from "react";

export default class PaginationCard extends Component {
  constructor() {
    super();
    this.state = {
      todos: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"],
      currentPage: 24,
      todosPerPage: 3,
      pageNumber: 45,
      pagesCount: 142,
      isPaginationShown: true,
      isPageNumberOutOfRange: null,
    };
    this.changePage = this.changePage.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.onPageNumberClick = this.onPageNumberClick.bind(this);
    this.pageNumbers = this.pageNumbers.bind(this);
    this.onPreviousPageClick = this.onPreviousPageClick.bind(this);
    this.onNextPageClick = this.onNextPageClick.bind(this);
    this.setLastPageAsCurrent = this.setLastPageAsCurrent.bind(this);
  }

  changePage(number) {
    if (this.state.currentPage === number) return;
    this.setCurrentPage(number);
  }

  setCurrentPage(pageNumber) {
    this.setState({
      currentPage: pageNumber,
    });
  }

  onPageNumberClick(pageNumber) {
    this.changePage(pageNumber);
  }

  onPreviousPageClick() {
    this.changePage(this.state.currentPage - 1);
  }

  onNextPageClick() {
    this.changePage(this.state.currentPage + 1);
  }

  setLastPageAsCurrent() {
    if (this.state.currentPage > this.state.pagesCount) {
      this.setCurrentPage(this.state.pagesCount);
    }
  }

  pageNumbers() {
    return [...new Array(this.state.pagesCount)].map((_, index) => {
      const pageNumber = index + 1;
      const isPageNumberFirst = this.state.pageNumber === 1;
      const isPageNumberLast = this.state.pageNumber === this.state.pagesCount;
      const isCurrentPageWithinTwoPageNumbers =
        Math.abs(this.state.pageNumber - this.state.currentPage) <= 2;
      if (
        isPageNumberFirst ||
        isPageNumberLast ||
        isCurrentPageWithinTwoPageNumbers
      ) {
        this.state.isPageNumberOutOfRange = false;
        return (
          <Pagination.Item
            key={this.state.pageNumber}
            onClick={() => this.onPageNumberClick(this.state.pageNumber)}
            active={this.state.pageNumber === this.state.currentPage}
          >
            {this.state.pageNumber}
          </Pagination.Item>
        );
      }

      if (!this.state.isPageNumberOutOfRange) {
        this.setState({
          isPageNumberOutOfRange: true,
        });
        return <Pagination.Ellipsis key={pageNumber} className="muted" />;
      }

      return null;
    });
  }

  render() {
    return (
      <>
        {this.state.isPaginationShown && (
          <Pagination>
            <Pagination.Prev
              onClick={this.onPreviousPageClick}
              disabled={this.isCurrentPageFirst}
            />
            {this.pageNumbers()}
            <Pagination.Next
              onClick={this.onNextPageClick}
              disabled={this.isCurrentPageLast}
            />
          </Pagination>
        )}
      </>
    );
  }
}
