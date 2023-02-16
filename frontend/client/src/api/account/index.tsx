import Cookie from "universal-cookie";

const cookie = new Cookie();

export const createProf = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/profile/`, {
      method: "POST",
      body: JSON.stringify({ name: "user" }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        throw "JWT Token not valid";
      } else if (res.ok) {
        return res.json();
      }
    });
  } catch (err) {
    alert(err);
  }
};

export const getProf = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        throw "JWT Token not valid";
      } else if (res.ok) {
        console.log(res);
        return res.json();
      }
    });
  } catch (err) {
    alert(err);
  }
};

export const getMyProf = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/myprofile/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    );
    const profile = await res.json();
    return profile;
    // .then((res) => {
    //   if (res.status == 401) {
    //     throw 'JWT Token not valid';
    //   } else if (res.ok) {
    //     return res.json();
    //   }
    // });
  } catch (err) {
    alert(err);
  }
};
