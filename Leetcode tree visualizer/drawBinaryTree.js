import { BinaryTreeNode } from "./BinaryTreeNode.js"
import { getRequiredHeightAndWidth, DEFAULT_CONFIG, drawNode, connectEdges } from "./treeUtils.js"

const canvas = document.querySelector("canvas");


function drawBinaryTree(root, canvasElement) {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    // Initialize the canvas dimension
    canvasElement.width = maxWidth;
    canvasElement.height = maxHeight;

   // Calculate required width and height to draw the tree structure
   const {
      requiredCanvasWidth,
      requiredCanvasHeight
   } = getRequiredHeightAndWidth(root);

   const windowWidthCenter = maxWidth / 2;
   const requiredWidthCenter = requiredCanvasWidth / 2;

   const xStart = windowWidthCenter - requiredWidthCenter;
   const xEnd = windowWidthCenter + requiredWidthCenter;
   
   const horizontalConfig = { xStart, xEnd };

   // Drawing part
   recursivelyDrawNodes(root, canvasElement, 0.5, horizontalConfig);
}

// Algorithm :
// 1) Find root node coordinates
// 2) Draw root circle
// 3) Recursively draw left and right nodes
// 4) Connect edges of root with left and right nodes
function recursivelyDrawNodes(root, canvasElement, currentLine, horizontalConfig) {
    const { xStart, xEnd } = horizontalConfig;

    const xPos = (xStart + xEnd) / 2;
    const yPos = currentLine * DEFAULT_CONFIG.nodeHeightSpacing;

    drawNode(root.value, canvasElement, xPos, yPos);

    if (root.left !== null) {
       const leftNodeHorizontalConfig = { xStart, xEnd: xPos }
       recursivelyDrawNodes(root.left, canvasElement, currentLine + 1, leftNodeHorizontalConfig);

       connectEdges(canvasElement,
           {
               xStart: xPos,
               xEnd: (xStart + xPos) / 2
           },
           {
               yStart: yPos + DEFAULT_CONFIG.radius,
               yEnd: ((currentLine + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - DEFAULT_CONFIG.radius
           }
       );
    }

    if (root.right !== null) {
        const rightNodeHorizontalConfig = { xStart: xPos, xEnd }
        recursivelyDrawNodes(root.right, canvasElement, currentLine + 1, rightNodeHorizontalConfig);

        connectEdges(canvasElement,
            {
                xStart: xPos,
                xEnd: (xPos + xEnd) / 2
            },
            {
                yStart: yPos + DEFAULT_CONFIG.radius,
                yEnd: ((currentLine + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - DEFAULT_CONFIG.radius
            }
       );
    }
}


const root = new BinaryTreeNode(1);

const node2 = new BinaryTreeNode(2);
root.setLeft(node2);

const node3 = new BinaryTreeNode(3);
root.setRight(node3);

const node4 = new BinaryTreeNode(4);
node3.setLeft(node4);

const node5 = new BinaryTreeNode(5);
node3.setRight(node5);

const node6 = new BinaryTreeNode(6);
node2.setLeft(node6);

console.log(root);

drawBinaryTree(root, canvas);