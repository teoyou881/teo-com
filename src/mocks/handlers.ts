import {http, HttpResponse} from 'msw'
import {faker} from "@faker-js/faker";

const User = [
  {id: 'elonmusk', nickname: 'Elon Musk', image: faker.image.avatar()},
  {id: 'suyou881 ', nickname: 'teo', image: '/whoru.jpg'},
  {id: 'neal', nickname: 'neal', image: faker.image.avatar()},
]

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const handlers = [
  http.post(`${baseUrl}/api/login`, () => {
    console.log('Sign in');
    return HttpResponse.json(User[1], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
        'Content-Type': 'application/json; charset=UTF-8'

      },
    })
  }),
  http.post(`${baseUrl}/api/logout`, () => {
    console.log('Logout');
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
      }
    })
  }),
  http.post(`${baseUrl}/api/users`, async ({ request }) => {
    // console.log('Sign up');
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403,
    // });
    return HttpResponse.text(JSON.stringify('ok'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
        'Content-Type': 'application/json; charset=UTF-8'
      },
    });
  })
];