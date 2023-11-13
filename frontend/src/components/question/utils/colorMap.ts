import Complexity from "../../../models/enums/Complexity";

export function complexityColorMap(complexity: string): string {
  switch (complexity) {
    case 'Easy':
      return 'green';
    case 'Medium':
      return 'orange';
    case 'Hard':
      return 'red';
    default:
      return 'white';
  }
}
