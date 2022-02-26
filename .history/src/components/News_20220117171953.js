import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     articles: [],
  //     loading: true,
  //     page: 1,
  //     totalResults:0
  //   };
  // }

  const updateNews = async () => {
    setPage(page+1);
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=375f907ab70649bdbad200065a32b649&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(30);
    // this.setState({ loading: true });
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalArticles: parsedData.totalResults,
    //   loading: false,
    // });
    props.setProgress(100);
  };
  useEffect(() => {
    updateNews();
  }, []);
  const onPrevHandler = async () => {
    setPage(page - 1);
    updateNews();
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   props.country
    // }&category=${
    //   props.category
    // }&apiKey=375f907ab70649bdbad200065a32b649&page=${
    //   this.state.page - 1
    // }&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
  };
  const onNextHandler = async () => {
    setPage(page - 1);
    updateNews();
    // if (
    //   this.state.page + 1 >
    //   Math.ceil(this.state.totalResults / props.pageSize)
    // ) {
    // } else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     props.country
    //   }&category=${
    //     props.category
    //   }&apiKey=375f907ab70649bdbad200065a32b649&page=${
    //     this.state.page + 1
    //   }&pageSize=${props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
  };

  const fetchData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=375f907ab70649bdbad200065a32b649&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    // this.setState({
    //   articles:articles.concat(parsedData.articles),
    //   totalResults:parsedData.totalResults,
    //   // loading:false
    // })
  };

  return (
    <>
      {/* <div className="container my-3"> */}
      <h2 className="text-center my-5">NewsMonkey-Top News</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 20) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 60)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              class="btn btn-dark"
              onClick={this.onPrevHandler}
            >
              &larr;Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / props.pageSize)
              }
              type="button"
              class="btn btn-dark"
              onClick={this.onNextHandler}
            >
              Next&rarr;
            </button>
          </div> */}
      {/* // </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
