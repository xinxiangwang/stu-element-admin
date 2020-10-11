const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

module.exports = [
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      if (!token) {
        return {
          code: 401, //
          message: '身份验证失败'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  }
]