import { MinHeap } from "./minHeap";

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const queue = [];
  startNode.distance = 0;
  queue.push(startNode);

  while (queue.length > 0) {
    const node = queue.shift();
    if (node.isWall || node.isVisited) continue;
    node.isVisited = true;
    visitedNodesInOrder.push(node);

    if (node === finishNode) return visitedNodesInOrder;

    const neighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of neighbors) {
      const newDistance = node.distance + 1;
      if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
        neighbor.previousNode = node;
        queue.push(neighbor);
      }
    }
  }

  return visitedNodesInOrder;
}


function updateUnvisitedNeighbors(node, grid, minHeap) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

    for (const neighbor of unvisitedNeighbors) {
        const newDistance = node.distance + 1; // Assuming uniform edge weights of 1
        if (newDistance < neighbor.distance) {
            neighbor.distance = newDistance;
            neighbor.previousNode = node;

            // Insert the neighbor into the MinHeap
            minHeap.insertKey(neighbor);
        }
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;

    // Check up
    if (row > 0) neighbors.push(grid[row - 1][col]);
    // Check right
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    // Check down
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    // Check left
    if (col > 0) neighbors.push(grid[row][col - 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited);
}


export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

function resetGridForDijkstra(grid) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const node = grid[row][col];
            node.isVisited = false;
            node.distance = Infinity;
            node.previousNode = null;
        }
    }
}
