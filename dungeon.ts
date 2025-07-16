function calculateMinimumHP(dungeon: number[][]): number {
     const m: number = dungeon.length;       // Number of rows
    const n: number = dungeon[0].length;    // Number of columns
    let dp: number[][] = Array.from(Array(m + 1), () => new Array(n + 1).fill(0x3f3f3f3f)); // Create DP table filled with large values, since we are looking for minimum health required

    // Set the health needed at the dungeon's exit. We need at least 1 health at the end.
    dp[m][n - 1] = 1; // If at the last cell of the last row
    dp[m - 1][n] = 1; // If at the last cell of the last column

    // Loop through the dungeon starting from the bottom right corner, moving to the upper left corner
    for (let i = m - 1; i >= 0; i--) {  // Loop for rows
        for (let j = n - 1; j >= 0; j--) { // Loop for columns
            // The minimum health needed at the start of this cell is either 1 or the health we need for the next cell
            // minus the current cell value, whichever is larger. We use `Math.max` to ensure we don't have non-positive health.
            // We also want the smaller of the two possible paths (rightward or downward) to reach the next cell hence we use `Math.min`.
            dp[i][j] = Math.max(1, Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j]);
        }
    }

    return dp[0][0];  // The minimum health needed at the start is at the top-left corner of the DP table.
};


// Calculate the minimum health needed to reach the princess dynamically version
export function calculateMinimumHPV2(dungeon: number[][]): number {

  const number_rows = dungeon.length; // Number of rows
  const number_columns = dungeon[0].length; // Number of columns

  // Minimum health for each spot
  const dp: number[][] = Array.from({ length: number_rows }, () => Array(number_columns).fill(0));

  // Initialize the bottom-right cell
  dp[number_rows - 1][number_columns - 1] = Math.max(1, 1 - dungeon[number_rows - 1][number_columns - 1]);

  // Fill the last row
  for (let j = number_columns - 2; j >= 0; j--) {
    dp[number_rows - 1][j] = Math.max(1, dp[number_rows - 1][j + 1] - dungeon[number_rows - 1][j]);
  }

  // Fill the last column
  for (let i = number_rows - 2; i >= 0; i--) {
    dp[i][number_columns - 1] = Math.max(1, dp[i + 1][number_columns - 1] - dungeon[i][number_columns - 1]);
  }

  // To survive, we need enough health at each cell to handle its value and still move forward
  for (let i = number_rows - 2; i >= 0; i--) {
    for (let j = number_columns - 2; j >= 0; j--) {
      // picks the less costly path right or down
      // ensures health never drops below 1
      const minHealthNeeded = Math.min(dp[i + 1][j], dp[i][j + 1]);
      dp[i][j] = Math.max(1, minHealthNeeded - dungeon[i][j]);
    }
  }

  // Return the minimum health
  return dp[0][0];
}
