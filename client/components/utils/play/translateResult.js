export function translateResult(result) {
  switch (result) {
    case 'SO':
      return 'Strikeout!';
    case 'GB':
      return 'Groundout!';
    case 'FB':
      return 'Flyout!';
    case 'BB':
      return 'Walk!';
    case 'single':
      return 'Single!';
    case 'singlePlus':
      return 'Single-Plus!';
    case 'double':
      return 'Double!';
    case 'triple':
      return 'Triple!';
    case 'homeRun':
      return 'Home Run!!!';
    case 'PU':
      return 'Popout!';
    default:
      return '';
  }
}