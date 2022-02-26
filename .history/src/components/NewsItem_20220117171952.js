import { getByTitle } from "@testing-library/dom";
import React from "react";

const NewsItem=(props)=> {
 
    let { title, description, imageUrl, newsUrl, author, date} = props;
    return (
      <div>
        <div class="card" style={{ width: "18rem" }}>
          <img src={!imageUrl?"https://westernnews.media.clients.ellingtoncms.com/img/photos/2018/08/07/Breaking_news_red.jpg":imageUrl} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{title}....</h5>
            <p class="card-text">{description}....</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {date}</small></p>
            <a href={newsUrl} target="_blank" class="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
