import React from "react";
import Moment from 'react-moment';
import { Image, Container } from 'react-bootstrap';
import { FileIcon, defaultStyles } from 'react-file-icon';
import {downloadFile} from '../../../helpers/downloadUtils'
import TextareaAutosize from 'react-textarea-autosize';

import "./story-font.css"
import "./comment-style.css"
export default function Comment(props) {
  const { postedBy, content, postedAt, attachmentResponseDto } = props.comment;

  let regexForFileExtension = /(?:\.([^.]+))?$/;


  return (
    <div className="media-body p-2 shadow-sm rounded bg-light border">
      <Container className="container-full">
        <div>
          <Image className="image-style"
            src={`https://ssl.gstatic.com/accounts/ui/avatar_2x.png`}
          />
          <h4 className="mt-0 mb-1 text-muted">{postedBy.username}</h4>
          <Moment style={{ font: "caption" }} className="mt-0 mb-1 text-muted" format="YYYY-MM-DD HH:mm">{postedAt}</Moment>
        </div>
      </Container>
      <div className="comment-font">
        <TextareaAutosize
          className="disabled" value={content} disabled={true} style={{ width: "100%" }} maxRows={50} minRows={5}>
        </TextareaAutosize>
      </div>

      {attachmentResponseDto && attachmentResponseDto.length > 0 ?
        <div style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "flex-end" }}>
          {attachmentResponseDto.map((attachment, index) => (
            <div key={attachment.id} className="attachment">
              <a target="_blank" href={"download-file/" + attachment.name} onClick={() => downloadFile(attachment.url)} style={{ margin: "12px 36px 15px 0px" }}>
                <div style={{ width: "50px" }} >
                  <FileIcon extension={regexForFileExtension.exec(attachment.name)[1]} {...defaultStyles.docx} />
                </div>
                <div className="bottom-container">
                  <h2 className="date-attachment-moment-format">{attachment.name.length > 30 ? attachment.name.substring(0, 27) + "..." : attachment.name}</h2>
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