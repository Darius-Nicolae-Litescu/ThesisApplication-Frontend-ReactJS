import React from "react";
import Moment from 'react-moment';
import { Image, Container } from 'react-bootstrap';

export default function StorySubtask(props) {
  const { createdBy, title, description, createdAt, id, status, storyPoints } = props.subtask;

  return (
    <a href={`/story-task/${id}`} style={{ textDecoration: "none" }}>
      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <Container style={{ display: "inline", marginTop: 20 }}>
          <div>
            <h4>{title}</h4>
            <div className="comment-font" style={{ lineHeight: "22px", fontWeight: "400", color: "darkslategrey", letterSpacing: "0.3px" }}>
              {description &&
                description
                  .split('\n')
                  .map((paragraph, index) => <p key={index}>{paragraph.length > 170 ? paragraph.substring(0, 167) + "..." : paragraph}</p>)}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Image
                    style={{
                      flex: 1,
                      width: 100,
                      height: 100,
                    }}
                    src={`https://ssl.gstatic.com/accounts/ui/avatar_2x.png`}
                  />
                  <h4 className="mt-0 mb-1 text-muted">{createdBy.username}</h4>
                  <Moment style={{ font: "caption" }} className="mt-0 mb-1 text-muted" format="YYYY-MM-DD HH:mm">{createdAt}</Moment>
                </div>
                <div style={{ display: "inline-grid", alignContent: "center" }}>
                  <h4 className="mt-0 mb-1 text-muted">Status: {status}</h4>
                  <h4 className="mt-0 mb-1 text-muted">Story points: {storyPoints}</h4>
                </div>
              </div>
            </div>
          </div>
        </Container>

      </div>
    </a>
  );
}