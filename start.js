module.exports = async (kernel) => {
  let env = { SD_WEBUI_RESTARTING: 1 }
  if (kernel.platform === 'darwin' && kernel.arch === 'x64') {
    env.PYTORCH_MPS_HIGH_WATERMARK_RATIO = 0
  }
  return {
    daemon: true,
    run: [{
      method: "shell.run",
      params: {
        path: "app",
        message: (kernel.platform === 'win32' ? 'webui-user.bat' : 'bash webui.sh -f'),
        env,
        on: [{ "event": "/http:\/\/[0-9.:]+/", "done": true }]
      }
    }, {
      method: "local.set",
      params: {
        "url": "{{input.event[0]}}",
      }
    }, {
      "method": "proxy.start",
      "params": {
        "uri": "{{local.url}}",
        "name": "Local Sharing"
      }
    }]
  }
}
