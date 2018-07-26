import axios from "axios";

describe("user resolvers", () => {
  test("allUsers", async () => {
    const response = await axios.post("http://localhost:8081/graphql", {
      query: `
      query {
        allUsers {
          id
          username
          email
        }
      }
      `
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        allUsers: []
      }
    });
  });

  test("create team", async () => {
    const response = await axios.post("http://localhost:8081/graphql", {
      query: `
      mutation {
        register(username: "test", email: "test@email.com", password: "test") {
          verified
          errors {
            path
            message
          }
          user {
            username
            email
          }
        }
      }
      `
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        register: {
          verified: true,
          errors: null,
          user: {
            username: "test",
            email: "test@email.com"
          }
        }
      }
    });

    const response2 = await axios.post("http://localhost:8081/graphql", {
      query: `
      mutation {
        login(email: "test@email.com", password: "test") {
          token
          refreshToken
        }
      }
      `
    });

    const {
      data: {
        login: { token, refreshToken }
      }
    } = response2.data;

    const response3 = await axios.post(
      "http://localhost:8081/graphql",
      {
        query: `
      mutation {
        createTeam(name: "team1") {
          verified
          team {
            name
          }
        }
      }
      `
      },
      {
        headers: {
          "x-token": token,
          "x-refresh-token": refreshToken
        }
      }
    );

    expect(response3.data).toMatchObject({
      data: {
        createTeam: {
          verified: true,
          team: {
            name: "team1"
          }
        }
      }
    });
  });
});
