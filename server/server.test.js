import {MatchingTags} from "./server"

test('checks of one array has elements of the other', () => {
  expect(server.MatchingTags([1, 2, 3, 4, 5], [2, 3, 4])).toBe(true);
})