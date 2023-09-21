import { getCategoriesString } from "./Util";

const desc1 =
  "Write a function that reverses a string. The input string is given as an array of characters s. "
  + '\n\n'
  + "You must do this by modifying the input array in-place with O(1) extra memory."
  + "\n\n"
  + "Example 1:"
  + "\n\n"
  + `Input: s = ["h","e","l","l","o"]\n`
  + `Output: ["o","l","l","e","h"]\n\n`
  + `Example 2:`
  + '\n\n'
  + `Input: s = ["H","a","n","n","a","h"]\n`
  + `Output: ["h","a","n","n","a","H"]`
  + '\n\n'
  + 'Contraints\n'
  + '  - 1 <= s.length <= 105\n'
  + '  -s[i] is a printable ascii character.';


const desc2 =
  "Given head, the head of a linked list, determine if the linked list has a cycle in it. \n\n"
  + "There is a cycle in a linked list if there is some node in the list that can be"
  + "reached again by continuously following the next pointer. Internally, pos is"
  + "used to denote the index of the node that tail's next pointer is connected to."
  + "Note that pos is not passed as a parameter. \n\n"
  + "Return true if there is a cycle in the linked list. Otherwise, return false.\n\n"
  + "Example 1: \n\n"
  + "Input: head = [3,2,0,-4], pos = 1 \n"
  + "Output: true\n"
  + "Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).\n\n"
  + "Example 2:\n\n"
  + "Input: head = [1,2], pos = 0\n"
  + "Output: true\n"
  + "Explanation: There is a cycle in the linked list, where the tail connects to the 0th node\n\n"
  + "Example 3: \n\n"
  + "Input: head = [1], pos = -1\n"
  + "Output: false\n"
  + "Explanation: There is no cycle in the linked list.\n\n"
  + "Constraints\n"
  + "  - The number of the nodes in the list is in the range [0, 104].\n"
  + "  - -105 <= Node.val <= 105\n"
  + "  - pos is -1 or a valid index in the linked-list.\n\n"
  + "Follow up: Can you solve it using O(1) (i.e. constant) memory?";


const mockQuestions = [
  { id: '1', title: 'Reverse a String', categories: ['Strings', 'Algorithms'], complexity: 'Easy', description: desc1, link: 'https://leetcode.com/problems/reverse-string' },
  { id: '2', title: 'Linked List Cycle Detection', categories: ['Data Structures', 'Algorithms'], complexity: 'Easy', description: desc2, link: 'https://leetcode.com/problems/linked' },
  { id: '3', title: 'Linked Listasdasd Cycle Detection', categories: getCategoriesString(), complexity: 'Easy', description: desc2, link: 'https://leetcode.com/problems/linked' },
];



export { mockQuestions };
