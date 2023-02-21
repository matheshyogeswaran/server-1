users = {
  _id: 1111111111,
  firstName: "Ava",
  lastName: "Carol",
  gender: "Male",
  dob: "20-12-2000",
  phoneNumber: "0772116778",
  emailAddress: "ava@intervest.com",
  department: "id from departments collection",
  jobPosition: "id from jobTitle collection",
  verified: false,
  dataCollected: true,
  userStatus: "Active",
};

departments = {
  _id: 1222222222,
  depName: "IT",
  createdOn: "date",
  createdBy: "id from users collection",
  jobTitles: ["jtID", "jtID"],
  chaptersOffer: [
    {
      _id: "id23455637645",
      chapterName: "Web Development",
      createdBy: "id from users collection",
      department: "id from departments collection",
      offeredInJobTitles: ["jtId", "jtId"],
      createdOn: "date",
      status: "Active",
      unitsOffer: [
        {
          _id: "id234556657568",
          unitName: "HTML",
          unitDesc: "HTML is a markup language",
          createdBy: "id from users collection",
          createdOn: "date",
          status: "Active",
          ktSessions: [
            {
              _id: "id234556657568",
              sessionName: "HTML Basics",
              sessionDesc: {
                text: "HTML is a markup language",
                video: "https://www.youtube.com/watch?v=FLvxuM1_rDk",
                audio: "https://www.youtube.com/watch?v=FLvxuM1_rDk",
              },
              createdBy: "id from users collection",
              createdOn: "date",
              overallRating: 4,
              overallQuality: 4,
              overallComm: 4,
              overallClarity: 4,
              overallKnowledgeAndSkill: 4,
              ratings: {
                "id from users collection": {
                  ratedOn: "date",
                  qualityRate: 4,
                  commRate: 4,
                  clarityRate: 4,
                  knowledgeAndSkillRate: 4,
                },
              },
              comments: {
                "id from users collection": {
                  comment: "This is a comment",
                  commentedOn: "date",
                  replies: {
                    "id from users collection": {
                      reply: "This is a reply",
                      repliedOn: "date",
                    },
                  },
                },
              },
            },
            {
              _id: "id876798785586",
              sessionName: "Tables in HTML",
              sessionDesc: {
                text: "Tables in HTML",
                video: "https://www.youtube.com/watch?v=FLvxuM1_rDk",
                audio: "https://www.youtube.com/watch?v=FLvxuM1_rDk",
              },
              createdBy: "id from users collection",
              createdOn: "date",
              overallRating: 4,
              overallQuality: 4,
              overallComm: 4,
              overallClarity: 4,
              overallKnowledgeAndSkill: 4,
              ratings: [
                {
                  _id: "id from users collection",
                  ratedOn: "date",
                  qualityRate: 4,
                  commRate: 4,
                  clarityRate: 4,
                  knowledgeAndSkillRate: 4,
                },
              ],
              comments: [
                {
                  _id: "id from users collection",
                  comment: "This is a comment",
                  commentedOn: "date",
                  replies: {
                    "id from users collection": {
                      reply: "This is a reply",
                      repliedOn: "date",
                    },
                  },
                },
              ],
            },
          ],
          quizzes: [
            {
              _id: "id234556657568",
              quizName: "HTML Basics",
              quizDesc: "HTML is a markup language",
              createdBy: "id from users collection",
              createdOn: "date",
              questions: [
                {
                  _id: 1,
                  question: "What is HTML?",
                  options: [
                    "A markup language",
                    "A programming language",
                    "A database language",
                    "A scripting language",
                  ],
                  answer: "A markup language",
                },
                {
                  _id: 2,
                  question:
                    "What is the correct HTML tag for the largest heading?",
                  options: ["<h1>", "<heading>", "<h6>", "<head>"],
                  answer: "<h1>",
                },
              ],
            },
          ],
        },
      ],
      articlesOffer: [
        {
          _id: "id2354656657568",
          articleName: "HTML Basics",
          articleDesc: "HTML is a markup language",
          createdBy: "id from users collection",
          createdOn: "date",
          files: ["URL1", "URL2", "URL3"],
          overallRating: 4,
          overallQuality: 4,
          overallComm: 4,
          overallClarity: 4,
          overallKnowledgeAndSkill: 4,
          ratings: [
            {
              _id: "id from users collection",
              ratedOn: "date",
              qualityRate: 4,
              commRate: 4,
              clarityRate: 4,
              knowledgeAndSkillRate: 4,
            },
          ],
        },
        {
          _id: "id2674556356568",
          articleName: "JavaScript Basics",
          articleDesc:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          createdBy: "id from users collection",
          createdOn: "date",
          files: ["URL1", "URL2", "URL3"],
          overallRating: 4,
          overallQuality: 4,
          overallComm: 4,
          overallClarity: 4,
          overallKnowledgeAndSkill: 4,
          ratings: [
            {
              _id: "id from users collection",
              ratedOn: "date",
              qualityRate: 4,
              commRate: 4,
              clarityRate: 4,
              knowledgeAndSkillRate: 4,
            },
          ],
        },
      ],
      discussionForums: [
        {
          _id: "id234556657568",
          topic: "Ways to add css to html",
          description: "There are many ways to add css to html",
          createdBy: "id from users collection",
          createdOn: "date",
          status: "Active/Locked",
          attachmentAllowed: true,
          posts: [
            {
              _id: "id234556657568",
              description: "Inline CSS is the best way to add css to html",
              createdBy: "id from users collection",
              createdOn: "date",
              attachment: ["URL1", "URL2", "URL3"],
              replies: [
                {
                  _id: "id234556657568",
                  description:
                    "Yes, But using external css is the best way to add css to html",
                  attachment: [],
                  createdBy: "id from users collection",
                  createdOn: "date",
                },
                {
                  _id: "id23455667568",
                  description:
                    "If you want to override external css, then inline css is the best way to add css to html",
                  attachment: [],
                  createdBy: "id from users collection",
                  createdOn: "date",
                },
              ],
            },
            {
              _id: "id2345545668",
              description:
                "Class and ID selectors are the best way to add css to html",
              createdBy: "id from users collection",
              createdOn: "date",
              attachment: ["URL1", "URL2", "URL3"],
            },
          ],
        },
      ],
    },
  ],
  jobTitlesOffer: ["jtId", "jtId"],
};

jobTitle = {
  _id: "32423545",
  jobTitlename: "Intern Software Engineer",
  departments: ["depid", "depid"],
  status: "Active",
  createdBy: "id from users collection",
  createdOn: "date",
  chaptersAllocated: ["chapId", "chapId", "chapId"],
};
