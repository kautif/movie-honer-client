import { userConstants, movieConstants, navConstants } from "./constants";
import { navigate, signupAsync } from "./actions";

describe("navigate", () => {
  it("Should return an object", () => {
    const page = "about";
    const action = navigate(page);
    expect(action.type).toBe(navConstants.NAVIGATE);
    expect(action.page).toBe(page);
  });
});

describe("signupAsync", () => {
  it("Dispatches signup request action", () => {
    const dispatch = jest.fn();
    const email = "someemail@gmail.com";
    const password = "somepassword";

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return null;
        }
      })
    );
    signupAsync(email, password)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: userConstants.SIGNUP_REQUEST
    });
  });

  it("Dispatches signup success action", () => {
    const dispatch = jest.fn();
    const email = "someemail@gmail.com";
    const password = "somepassword";

    const user = { username: "theuser" };

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return user;
        }
      })
    );
    return signupAsync(email, password)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: userConstants.SIGNUP_SUCCESS,
        user
      });
    });
  });

  it("Dispatches signup failure action", () => {
    const dispatch = jest.fn();
    const email = "someemail@gmail.com";
    const password = "somepassword";

    const error = "login failed";

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json() {
          return Promise.resolve({
            message: error
          });
        }
      })
    );
    return signupAsync(email, password)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: userConstants.SIGNUP_FAILURE,
        error
      });
    });
  });
});
