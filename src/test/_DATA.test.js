import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

describe("_saveQuestion Unit Testing", () => {
    it("should return the formatted questions", async () => {
        const question = {
            optionOneText: "A",
            optionTwoText: "B",
            author: {
                id: "chipmunk",
                name: "Chipmunk",
                avatarURL: "/images/chipmunk.png",
                answers: {
                    xj352vofupe1dqz9emx13r: "optionOne",
                    vthrdm985a262al8qx3do: "optionOne",
                },
                questions: ["vthrdm985a262al8qx3do"]
            }
          };
        const response = await _saveQuestion(question);

        expect(response).toBeTruthy();
    });

    it("should return the error when parameters is invalid", async () => {
        const response = await _saveQuestion(undefined).catch(e => e);

        expect(response).toBe("Please provide 2 answers of the question and its author")
    });

    it("should return the error when parameters has invalid properties", async () => {
        const response = await _saveQuestion({
            optionOneText: undefined,
            optionTwoText: undefined,
            author: undefined,
        }).catch(e => e);

        expect(response).toBe("Please provide 2 answers of the question and its author")
    });

    it("should return the error when parameters has at least one invalid property value", async () => {
        const response = await _saveQuestion({
            optionOneText: undefined,
            optionTwoText: "B",
            author: {
                id: "chipmunk",
                name: "Chipmunk",
                avatarURL: "/images/chipmunk.png",
                answers: {
                    xj352vofupe1dqz9emx13r: "optionOne",
                    vthrdm985a262al8qx3do: "optionOne",
                },
                questions: ["vthrdm985a262al8qx3do"]
            }
        }).catch(e => e);

        expect(response).toBe("Please provide 2 answers of the question and its author")
    });
});


describe("_saveQuestionAnswer Unit Testing", () => {
    it("should return true for correct parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "chipmunk",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne"
        });

        expect(response).toBeTruthy();
    });

    it("should return error for at least one invalid property", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: undefined,
            answer: "optionOne"
        }).catch(e => e);

        expect(response).toBe("Please provide the answer, user and question id");
    });

    it("should return error for all invalid properties", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: undefined,
            qid: undefined,
            answer: undefined
        }).catch(e => e);

        expect(response).toBe("Please provide the answer, user and question id");
    });
});