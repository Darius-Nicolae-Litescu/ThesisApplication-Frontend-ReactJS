import React from "react";
import Moment from 'react-moment';
import { Image, Container } from 'react-bootstrap';
import { FileIcon, defaultStyles } from 'react-file-icon';
import downloadFile from '../../../helpers/downloadFile'

import "./story-task-font.css"

export default function Comment(props) {
  const { postedBy, content, postedAt, attachmentResponseDto } = props.comment;

  let regexForFileExtension = /(?:\.([^.]+))?$/;


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
          <Moment style={{ font: "caption" }} className="mt-0 mb-1 text-muted" format="YYYY-MM-DD HH:mm">{postedAt}</Moment>
        </div>
      </Container>
      <div className="comment-font" style={{ lineHeight: "22px", fontWeight: "400", color: "darkslategrey", letterSpacing: "0.3px" }}>
        {content &&
          content
            .split('\n')
            .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>

      {attachmentResponseDto && attachmentResponseDto.length > 0 ?
        <div style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "flex-end" }}>
          {attachmentResponseDto.map((attachment, index) => (
            <div>
              <button onClick={() => downloadFile(attachment.url)}></button>
            <a href={attachment.url} key={index} style={{margin: "12px 36px 15px 0px"}}>
              <div style={{ width: "50px" }} >
                <FileIcon extension={regexForFileExtension.exec(attachment.name)[1]} {...defaultStyles.docx} />
              </div>
              <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "10px", display: "grid", alignContent: "center" }}>
                <h2 style={{ fontSize: "15px", font: "caption" }}>{attachment.name.length > 30 ? attachment.name.substring(0, 27) + "..." : attachment.name}</h2>
                <Moment style={{ fontSize: "15px", font: "caption" }} className="mt-0 mb-1 text-muted" format="YYYY-MM-DD HH:mm">{attachment.postedAt}</Moment>
              </div>
            </a>
            </div>
          ))}
        </div>
        : <div></div>
      }
    </div>
  );
}