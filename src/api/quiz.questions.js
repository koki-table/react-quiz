const quizQuestions = [
    {
        id: "1",
        question: "1問目",
        answers: [
            {
                type: "mistake1",
                content: "だみーーーーみす1-1"
            },
            {
                type: "mistake2",
                content: "だみーーーーみす1-2"
            },
            {
                type: "mistake3",
                content: "だみーーーーみす1-3"
            },
            {
                type: "Sony",
                content: "せいかい"
            }
        ]
    },
    {
        id: "2",
        question: "2問目",
        answers: [
            {
                type: "mistake1",
                content: "だみーーーーみす2-1"
            },
            {
                type: "mistake2",
                content: "だみーーーーみす2-2"
            },
            {
                type: "mistake3",
                content: "だみーーーーみす2-3"
            },
            {
                type: "Sony",
                content: "せいかい"
            }
        ]
    },
    {
        id: "3",
        question: "3問目",
        answers: [
            {
                type: "mistake1",
                content: "だみーーーーみす1"
            },
            {
                type: "mistake2",
                content: "だみーーーーみす2"
            },
            {
                type: "mistake3",
                content: "だみーーーーみす3"
            },
            {
                type: "Sony",
                content: "せいかい"
            }
        ]
    },
    {
        id: "4",
        question: "4問目",
        answers: [
            {
                type: "mistake1",
                content: "だみーーーーみす1"
            },
            {
                type: "mistake2",
                content: "だみーーーーみす2"
            },
            {
                type: "mistake3",
                content: "だみーーーーみす3"
            },
            {
                type: "Sony",
                content: "せいかい"
            }
        ]
    },
    {
        id: "5",
        question: "5問目",
        answers: [
            {
                type: "mistake1",
                content: "だみーーーーみす1"
            },
            {
                type: "mistake2",
                content: "だみーーーーみす2"
            },
            {
                type: "mistake3",
                content: "だみーーーーみす3"
            },
            {
                type: "Sony",
                content: "せいかい"
            }
        ]
    },
    {
        id: "6",
        question: "6問目",
        answers: [
            {
                type: "mistake1",
                content: "だみーーーーみす1"
            },
            {
                type: "mistake2",
                content: "だみーーーーみす2"
            },
            {
                type: "mistake3",
                content: "だみーーーーみす3"
            },
            {
                type: "Sony",
                content: "せいかい"
            }
        ]
    },
    {
        id: "7",
        question: "7問目",
        answers: [
            {
                type: "mistake1",
                content: "だみーーーーみす1"
            },
            {
                type: "mistake2",
                content: "だみーーーーみす2"
            },
            {
                type: "mistake3",
                content: "だみーーーーみす3"
            },
            {
                type: "Sony",
                content: "せいかい"
            }
        ]
    },
    {
        id: "8",
        question: "8問目",
        answers: [
            {
                type: "mistake1",
                content: "だみーーーーみす1"
            },
            {
                type: "mistake2",
                content: "だみーーーーみす2"
            },
            {
                type: "mistake3",
                content: "だみーーーーみす3"
            },
            {
                type: "Sony",
                content: "せいかい"
            }
        ]
    },
    {
        id: "9",
        question: "9問目",
        answers: [
            {
                type: "mistake1",
                content: "だみーーーーみす1"
            },
            {
                type: "mistake2",
                content: "だみーーーーみす2"
            },
            {
                type: "mistake3",
                content: "だみーーーーみす3"
            },
            {
                type: "Sony",
                content: "せいかい"
            }
        ]
    },
    {
        id: "10",
        question: "10問目",
        answers: [
            {
                type: "mistake1",
                content: "だみーーーーみす1"
            },
            {
                type: "mistake2",
                content: "だみーーーーみす2"
            },
            {
                type: "mistake3",
                content: "だみーーーーみす3"
            },
            {
                type: "Sony",
                content: "せいかい"
            }
        ]
    },
];

export const getQuestionId = (id) => {
    return quizQuestions.find(item => item.id == id);
}

export const getQuestionLength = () => {
    return quizQuestions.length;
}