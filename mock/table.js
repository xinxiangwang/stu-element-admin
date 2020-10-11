module.exports = [
  {
    url: '/table',
    type: 'get',
    response: {
      "array|50-100": [
        {
          "age|15-25": 17,
          "isGoodBoy|1": true,
          "name": "@cname()",
          "born": "@province()"
        }
      ]
    }
  },
  {
    url: '/userTable',
    type: 'get',
    response: {
      "array|50-100": [
        {
          "age|15-25": 17,
          "isGoodBoy|1": true,
          "name": "@cname()",
          "born": "@province()"
        }
      ]
    }
  }
]