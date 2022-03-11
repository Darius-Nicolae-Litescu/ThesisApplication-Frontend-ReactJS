import React from "react";
import Moment from 'react-moment';
import { Image, Container } from 'react-bootstrap';
import "./story-font.css"

export default function Comment(props) {
  const { postedBy, content, postedAt } = props.comment;

  return (
    <div className="media-body p-2 shadow-sm rounded bg-light border">
      <Container style={{ display: "inline", marginTop: 20 }}>
        <div>
          <Image
            style={{
              flex: 1,
              width: 100,
              height: 100,
            }}
            src={`https://ssl.gstatic.com/accounts/ui/avatar_2x.png`}
          />
          <h4 className="mt-0 mb-1 text-muted">{postedBy.username}</h4>
          <Moment style={{font: "caption"}} className="mt-0 mb-1 text-muted" format="YYYY-MM-DD HH:mm">{postedAt}</Moment>
        </div>
      </Container>
      <div className="comment-font" style={{lineHeight: "22px", fontWeight: "400", color: "darkslategrey", letterSpacing: "0.3px"}}>
        {content &&
          content
            .split('\n')
            .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </div>
  );
}