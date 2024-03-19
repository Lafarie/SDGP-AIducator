import React from "react";

class PostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: props.UserId,
      ThreadId: props.ThreadId,
      Content: props.Content,
        CreationDate: props.CreationDate,
        UpVote: props.UpVote,
        DownVote: props.DownVote,
        Username: props.Username,
        Tag: props.Tag,
        Title: props.Title,
        PostId: props.PostId,
        VoteType: props.VoteType,
        VoteCount: props.VoteCount,
        PostCount: props.PostCount,
    };
  }
  render() {
    return (
      <div>
        <h1>PostComponent</h1>
      </div>
    );
  }
}
