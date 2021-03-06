// 构造函数 Chain
// fn 为需要被包装的函数
// nextNode 为链中的下一个节点
var Chain = function(fn) {
  this.fn = fn;
  this.nextNode = null;
};
// 指定链中的下一个节点
Chain.prototype.setNextNode = function(nextNode) {
  return (this.nextNode = nextNode); //返回下一个节点
};
// 处理并传递请求
Chain.prototype.handleRequest = function() {
  var ret = this.fn.apply(this, arguments);
  if (ret === "NEXT_NODE") {
    return (
      this.nextNode &&
      this.nextNode.handleRequest.apply(this.nextNode, arguments)
    );
  }
  return ret;
};
// 异步职责链，手动把请求传递给职责链中的下一个节点
Chain.prototype.next = function() {
  return (
    this.nextNode && this.nextNode.handleRequest.apply(this.nextNode, arguments)
  );
};
// 测试用
// 1.不同类型会议共有的参数
function handleCommonData(meeting) {
  // 1.同步
  // meeting.type = 0; //视频会议
  // // meeting.type = 1; //本地会议
  // return "NEXT_NODE";

  // 2.异步
  var self = this;
  setTimeout(function() {
    meeting.type = 0; //视频会议
    // meeting.type = 1; //本地会议
    self.next(meeting);
  }, 1000);
}
// 2.视频会议
function handleVideoMeeting(meeting) {
  // 0为视频会议
  if (meeting.type === 0) {
    meeting.video = "video";
  }
  return "NEXT_NODE";
}
// 3.本地会议
function handleLocalMeeting(meeting) {
  // 1为本地会议
  if (meeting.type === 1) {
    meeting.local = "local";
  }
  return "NEXT_NODE";
}
// 4.提交
function submit(meeting) {
  console.log(meeting);
}
var commonDataNode = new Chain(handleCommonData); //1.各种类型会议共有的参数
var videoMeetingNode = new Chain(handleVideoMeeting); //2.视频会议
var localMeetingNode = new Chain(handleLocalMeeting); //3.本地会议
var submitNode = new Chain(submit); //4.提交
commonDataNode
  .setNextNode(videoMeetingNode)
  .setNextNode(localMeetingNode)
  .setNextNode(submitNode);
commonDataNode.handleRequest({});
