function processData(dataArray) {
  // Step 1: Validate entries
  const invalidEntries = [];
  const validEntries = [];
  const edgeRegex = /^[A-Z]->[A-Z]$/;

  for (let entry of dataArray) {
    const trimmed = String(entry).trim();
    
    // Check for empty string
    if (trimmed === '') {
      invalidEntries.push(entry);
      continue;
    }

    // Check regex pattern
    if (!edgeRegex.test(trimmed)) {
      invalidEntries.push(entry);
      continue;
    }

    // Check for self-loop
    const [from, to] = trimmed.split('->');
    if (from === to) {
      invalidEntries.push(entry);
      continue;
    }

    validEntries.push(trimmed);
  }

  // Step 2: Detect duplicates
  const duplicateEdges = [];
  const seenEdges = new Set();

  const uniqueValidEntries = [];
  for (let edge of validEntries) {
    if (seenEdges.has(edge)) {
      if (!duplicateEdges.includes(edge)) {
        duplicateEdges.push(edge);
      }
    } else {
      seenEdges.add(edge);
      uniqueValidEntries.push(edge);
    }
  }

  // Step 3: Build adjacency maps from unique valid entries
  const childToParents = new Map(); // child -> set of parents
  const parentToChildren = new Map(); // parent -> set of children
  const allNodes = new Set();

  for (let edge of uniqueValidEntries) {
    const [from, to] = edge.split('->');
    allNodes.add(from);
    allNodes.add(to);

    if (!parentToChildren.has(from)) {
      parentToChildren.set(from, new Set());
    }
    parentToChildren.get(from).add(to);

    if (!childToParents.has(to)) {
      childToParents.set(to, new Set());
    }
    childToParents.get(to).add(from);
  }

  // Initialize all nodes in childToParents if not present
  for (let node of allNodes) {
    if (!childToParents.has(node)) {
      childToParents.set(node, new Set());
    }
  }

  // Handle multi-parent: keep only the first parent encountered
  const assignedParent = new Map(); // child -> parent (only one)
  const parentToChildrenFiltered = new Map(); // parent -> set of children (filtered)

  for (let edge of uniqueValidEntries) {
    const [from, to] = edge.split('->');

    // If this child already has a parent assigned, skip this edge
    if (assignedParent.has(to)) {
      continue;
    }

    // Assign parent to child
    assignedParent.set(to, from);

    if (!parentToChildrenFiltered.has(from)) {
      parentToChildrenFiltered.set(from, new Set());
    }
    parentToChildrenFiltered.get(from).add(to);
  }

  // Step 4: Find connected groups using BFS/Union-Find
  const visited = new Set();
  const groups = [];

  for (let node of allNodes) {
    if (!visited.has(node)) {
      const group = new Set();
      const queue = [node];
      visited.add(node);

      while (queue.length > 0) {
        const current = queue.shift();
        group.add(current);

        // Add neighbors (both parents and children)
        if (assignedParent.has(current)) {
          const parent = assignedParent.get(current);
          if (!visited.has(parent)) {
            visited.add(parent);
            queue.push(parent);
          }
        }

        if (parentToChildrenFiltered.has(current)) {
          for (let child of parentToChildrenFiltered.get(current)) {
            if (!visited.has(child)) {
              visited.add(child);
              queue.push(child);
            }
          }
        }
      }

      groups.push(group);
    }
  }

  // Step 5 & 6: For each group, find root and detect cycles
  const hierarchies = [];
  const roots = [];

  for (let group of groups) {
    // Find root: node with no parent in this group
    let root = null;
    for (let node of group) {
      if (!assignedParent.has(node)) {
        root = node;
        break;
      }
    }

    // If no root found (pure cycle), use lexicographically smallest node
    if (root === null) {
      const sortedNodes = Array.from(group).sort();
      root = sortedNodes[0];
    }

    roots.push(root);

    // Step 6: Cycle detection using DFS
    const visited_dfs = new Set();
    const recursionStack = new Set();
    let hasCycle = false;

    function dfs(node) {
      visited_dfs.add(node);
      recursionStack.add(node);

      if (parentToChildrenFiltered.has(node)) {
        for (let child of parentToChildrenFiltered.get(node)) {
          if (!visited_dfs.has(child)) {
            if (dfs(child)) {
              return true;
            }
          } else if (recursionStack.has(child)) {
            return true;
          }
        }
      }

      recursionStack.delete(node);
      return false;
    }

    hasCycle = dfs(root);

    // Step 7 & 8: Build tree and calculate depth
    if (hasCycle) {
      hierarchies.push({
        root: root,
        tree: {},
        has_cycle: true
      });
    } else {
      function buildTree(node) {
        const treeObj = {};
        if (parentToChildrenFiltered.has(node)) {
          const children = Array.from(parentToChildrenFiltered.get(node)).sort();
          for (let child of children) {
            treeObj[child] = buildTree(child);
          }
        }
        return treeObj;
      }

      function calculateDepth(node) {
        if (!parentToChildrenFiltered.has(node) || parentToChildrenFiltered.get(node).size === 0) {
          return 1;
        }
        let maxChildDepth = 0;
        for (let child of parentToChildrenFiltered.get(node)) {
          maxChildDepth = Math.max(maxChildDepth, calculateDepth(child));
        }
        return 1 + maxChildDepth;
      }

      const tree = { [root]: buildTree(root) };
      const depth = calculateDepth(root);

      hierarchies.push({
        root: root,
        tree: tree,
        depth: depth
      });
    }
  }

  // Step 9: Calculate summary
  const totalTrees = hierarchies.filter(h => !h.has_cycle).length;
  const totalCycles = hierarchies.filter(h => h.has_cycle).length;

  let largestTreeRoot = null;
  let maxDepth = 0;

  for (let hierarchy of hierarchies) {
    if (!hierarchy.has_cycle) {
      if (hierarchy.depth > maxDepth || (hierarchy.depth === maxDepth && (largestTreeRoot === null || hierarchy.root < largestTreeRoot))) {
        maxDepth = hierarchy.depth;
        largestTreeRoot = hierarchy.root;
      }
    }
  }

  return {
    user_id: "kesavarajaM_03052006",
    email_id: "km0308@srmist.edu.in",
    college_roll_number: "RA2311026050099",
    hierarchies: hierarchies,
    invalid_entries: invalidEntries,
    duplicate_edges: duplicateEdges,
    summary: {
      total_trees: totalTrees,
      total_cycles: totalCycles,
      largest_tree_root: largestTreeRoot
    }
  };
}

module.exports = { processData };
