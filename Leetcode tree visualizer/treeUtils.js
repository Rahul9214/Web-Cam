export const DEFAULT_CONFIG = {
    radius: 20,
    nodeWidthSpacing: 25,
    nodeHeightSpacing: 100,  // Line Height
    fontSize: 10
} 

 export function getRequiredHeightAndWidth(root) {
   const heightOfTree = root.getHeight();
   const maxLeafNodes = Math.pow(2, heightOfTree);

   const requiredCanvasHeight = heightOfTree * DEFAULT_CONFIG.nodeHeightSpacing;
   const requiredCanvasWidth = maxLeafNodes * DEFAULT_CONFIG.nodeWidthSpacing;

   return {
    requiredCanvasWidth,
    requiredCanvasHeight
   }
}

export function drawNode(value, canvasElement, x, y) {
    const context = canvasElement.getContext("2d");   // Tool to draw

    // Draw Circle
    context.beginPath();
    context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
    context.fillStyle = "lightsalmon";
    context.fill();

    // Draw circle border
    context.beginPath();
    context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
    context.strokeStyle = "brown";
    context.stroke();

    // Write value in the circle
    context.font = `${DEFAULT_CONFIG.fontSize}pt sans-serif`;
    context.fillStyle = "brown";
    context.textAlign = "center";
    context.fillText(value, x, y + DEFAULT_CONFIG.fontSize/2);   // y+DEF_CONF.fontSize/2 for getting value at the center
}

export function connectEdges(canvasElement, xCoordinates, yCoordinates) {
    const { xStart, xEnd } = xCoordinates;
    const { yStart, yEnd } = yCoordinates;
    
    const start = { x: xStart, y: yStart };
    const end = { x: xEnd, y: yEnd };

    // Draw the curves
    const context = canvasElement.getContext("2d");
    context.beginPath();
    context.strokeStyle = "brown";
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
}