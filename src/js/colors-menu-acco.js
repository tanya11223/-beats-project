const mesureWidth = item => {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".colors__list");
  const titlesBlocks = container.find(".color__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".color__container");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));


  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if(isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 500;
  }

  return{
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  }

};

const closeEveryItemInContainer = container => {
  const items = container.find(".color__item");
  const content = container.find(".color__content");
  const textBlock = items.find(".color__container");

  items.removeClass(".active");
  content.width(0);
  textBlock.width(req.Width.textContainer);
};

const openItem = item => {
  const hiddenContent = item.find(".color__content");
  const reqWidth = mesureWidth(item);

  item.addClass("active");
  hiddenContent.width(reqWidth.container);
}

$(".color__title").on("click", (e) =>{
  e.preventDefault();
  
  const $this = $(e.currentTarget);
  const item = $this.closest(".color__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".colors__list");

  if (itemOpened) {
    closeEveryItemInContainer(container)
  } else {
    closeEveryItemInContainer(container)
    openItem(item);
  }
});