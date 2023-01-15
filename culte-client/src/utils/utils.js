
function log(message) {
  const log = document.getElementsByName("log")[0];
  log.value += message + "\n";
}

export default log;