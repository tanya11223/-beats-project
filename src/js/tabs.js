const findBlockByAlias = alias => {
  return $(".reviews__item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") == alias;
  });
};

$(".review-switcher__link").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemtoShow = findBlockByAlias(target);
  const curItem = $this.closest(".interactive-avatar");

  itemtoShow.addClass("active").siblings().removeClass("active");
  curItem.addClass("active").siblings().removeClass("active");
});