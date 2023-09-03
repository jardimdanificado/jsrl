function matrixReplace(matrix, oldPattern, newPattern) {
    const numRows = matrix.length;
    if (numRows === 0) return matrix; // Empty matrix, nothing to replace

    const numCols = matrix[0].length;

    // Clone the original matrix
    const clonedMatrix = matrix.map((row) => [...row]);

    // Iterate through the matrix and check for the old pattern
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (clonedMatrix[row][col] === oldPattern[0][0] || oldPattern[0][0] === undefined) {
                // Check if the old pattern matches in this position or if it's undefined in the old pattern
                let matches = true;
                for (let i = 0; i < oldPattern.length; i++) {
                    for (let j = 0; j < oldPattern[i].length; j++) {
                        if (
                            row + i >= numRows ||
                            col + j >= numCols ||
                            (oldPattern[i][j] !== undefined && clonedMatrix[row + i][col + j] !== oldPattern[i][j])
                        ) {
                            matches = false;
                            break;
                        }
                    }
                    if (!matches) break;
                }

                // If the old pattern matches or is undefined, replace it with the new pattern
                if (matches) {
                    for (let i = 0; i < oldPattern.length; i++) {
                        for (let j = 0; j < oldPattern[i].length; j++) {
                            if (oldPattern[i][j] !== undefined) {
                                clonedMatrix[row + i][col + j] = newPattern[i][j];
                            }
                        }
                    }
                }
            }
        }
    }

    return clonedMatrix;
}
