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
// 测试用
// 1.不同类型会议共有的参数
function handleCommonData(meeting) {
  meeting.type = 0; //视频会议
  // meeting.type = 1; //本地会议
  return "NEXT_NODE";
}
// 2.视频会议
function handleVideoMeeting(meeting) {
  // 不是视频会议，交给下一个节点
  if (meeting.type !== 0) {
    return "NEXT_NODE";
  }
  meeting.video = "video";
}
// 3.本地会议
function handleLocalMeeting(meeting) {
  // 不是本地会议，交给下一个节点
  if (meeting.type !== 1) {
    return "NEXT_NODE";
  }
  meeting.local = "local";
}
var commonDataNode = new Chain(handleCommonData); //1.各种类型会议共有的参数
var videoMeetingNode = new Chain(handleVideoMeeting); //2.视频会议
var localMeetingNode = new Chain(handleLocalMeeting); //3.本地会议
commonDataNode.setNextNode(videoMeetingNode).setNextNode(localMeetingNode);
var meeting = {};
commonDataNode.handleRequest(meeting);
console.log(meeting);
