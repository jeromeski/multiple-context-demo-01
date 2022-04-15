import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import localforage from "localforage";
import _ from "lodash";
// import { FuseUtils } from "@fuse";
// import jwt from "jsonwebtoken";
import { useMutation } from "react-query";
import usersJson from "../data/users.json";

const mock = new MockAdapter(axios);

const { users } = usersJson;

// const jwtConfig = {
//   secret: "some-secret-code-goes-here",
//   expiresIn: "2 days" // A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
// };

mock.onPost("/api/auth").reply(200, { users });

async function login({ email, password }) {
  try {
    const res = await axios.post("/api/auth", { email, password });
    const {
      data: { users }
    } = res;

    const user = _.cloneDeep(users.find((_user) => _user.data.email === email));
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

export function useMutationLogin() {
  return useMutation((input) => login(input), {
    // onSuccess: (user) => {
    //   localforage.setItem("auth", JSON.stringify(user)).then((err) => {
    //     localforage.getItem("auth").then((val) => {
    //       console.log(JSON.parse(val));
    //     });
    //   });
    // }
  });
}

/*
mock.onPost("/api/auth").reply((config) => {
  const data = JSON.parse(config.data);
  const { email, password } = data;

  const user = _.cloneDeep(
    authDB.users.find((_user) => _user.data.email === email)
  );

  const error = {
    email: user ? null : "Check your username/email",
    password: user && user.password === password ? null : "Check your password"
  };

  if (!error.email && !error.password && !error.displayName) {
    delete user["password"];

    const access_token = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    const response = {
      user: user,
      access_token: access_token
    };

    return [200, response];
  } else {
    return [200, { error }];
  }
});

mock.onGet("/api/auth/access-token").reply((config) => {
  const data = JSON.parse(config.data);
  const { access_token } = data;

  try {
    const { id } = jwt.verify(access_token, jwtConfig.secret);

    const user = _.cloneDeep(authDB.users.find((_user) => _user.uuid === id));
    delete user["password"];

    const updatedAccessToken = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    const response = {
      user: user,
      access_token: updatedAccessToken
    };

    return [200, response];
  } catch (e) {
    const error = "Invalid access token detected";
    return [401, { error }];
  }
});

mock.onPost("/api/auth/register").reply((request) => {
  const data = JSON.parse(request.data);
  const { displayName, password, email } = data;
  const isEmailExists = authDB.users.find(
    (_user) => _user.data.email === email
  );
  const error = {
    email: isEmailExists ? "The email is already in use" : null,
    displayName: displayName !== "" ? null : "Enter display name",
    password: null
  };
  if (!error.displayName && !error.password && !error.email) {
    const newUser = {
      uuid: FuseUtils.generateGUID(),
      from: "custom-db",
      password: password,
      role: "admin",
      data: {
        displayName: displayName,
        photoURL: "assets/images/avatars/Abbott.jpg",
        email: email,
        settings: {},
        shortcuts: []
      }
    };

    authDB.users = [...authDB.users, newUser];

    const user = _.cloneDeep(newUser);
    delete user["password"];

    const access_token = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    const response = {
      user: user,
      access_token: access_token
    };

    return [200, response];
  } else {
    return [200, { error }];
  }
});

mock.onPost("/api/auth/user/update").reply((config) => {
  const data = JSON.parse(config.data);
  const { user } = data;

  authDB.users = authDB.users.map((_user) => {
    if (user.uuid === user.id) {
      return _.merge(_user, user);
    }
    return _user;
  });

  return [200, user];
});


*/
