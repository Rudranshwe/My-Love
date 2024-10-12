let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Mouse move events
    document.addEventListener('mousemove', (e) => {
      if (this.holdingPaper && !this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        const velX = this.mouseX - this.prevMouseX;
        const velY = this.mouseY - this.prevMouseY;

        this.currentPaperX += velX;
        this.currentPaperY += velY;
        
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ++;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;

      if (e.button === 2) {
        this.rotating = true;
      }
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // Touch events
    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ++;
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;

      if (e.touches.length > 1) {
        this.rotating = true; // Rotate if using two fingers
      }
    });

    document.addEventListener('touchmove', (e) => {
      if (this.holdingPaper && !this.rotating) {
        this.mouseX = e.touches[0].clientX;
        this.mouseY = e.touches[0].clientY;

        const velX = this.mouseX - this.touchStartX;
        const velY = this.mouseY - this.touchStartY;

        this.currentPaperX += velX;
        this.currentPaperY += velY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        
        this.touchStartX = this.mouseX;
        this.touchStartY = this.mouseY;
      }
    });

    window.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
