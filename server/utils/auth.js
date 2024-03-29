import jwt from "jsonwebtoken";
import pick from "lodash.pick";
import bcrypt from "bcrypt";

const auth = {
  createTokens: async (user, secret, secret2) => {
    const createToken = jwt.sign(
      {
        user: pick(user, ["id", "username"])
      },
      secret,
      {
        expiresIn: "1d"
      }
    );

    const createRefreshToken = jwt.sign(
      {
        user: pick(user, "id")
      },
      secret2,
      {
        expiresIn: "7d"
      }
    );

    return [createToken, createRefreshToken];
  },

  refreshTokens: async (token, refreshToken, models, SECRET, SECRET2) => {
    let userId = 0;
    try {
      const {
        user: { id }
      } = jwt.decode(refreshToken);
      userId = id;
    } catch (err) {
      return {};
    }

    if (!userId) {
      return {};
    }

    const user = await models.User.findOne({
      where: { id: userId },
      raw: true
    });

    if (!user) {
      return {};
    }

    const refreshSecret = user.password + SECRET2;

    try {
      jwt.verify(refreshToken, refreshSecret);
    } catch (err) {
      return {};
    }

    const [newToken, newRefreshToken] = await auth.createTokens(
      user,
      SECRET,
      user.refreshSecret
    );
    return {
      token: newToken,
      refreshToken: newRefreshToken,
      user
    };
  },

  tryLogin: async (email, password, models, SECRET, SECRET2) => {
    const user = await models.User.findOne({ where: { email }, raw: true });
    if (!user) {
      // user with provided email not found
      return {
        verified: false,
        errors: [{ path: "email", message: "Wrong email" }]
      };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      // bad password
      return {
        verified: false,
        errors: [{ path: "password", message: "Wrong password" }]
      };
    }

    const refreshTokenSecret = user.password + SECRET2;

    const [token, refreshToken] = await auth.createTokens(
      user,
      SECRET,
      refreshTokenSecret
    );

    return {
      verified: true,
      token,
      refreshToken
    };
  }
};

export default auth;
