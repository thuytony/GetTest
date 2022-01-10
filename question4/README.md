# Question 4: If you were working on an application that was rendering a page very slowly, how would you go about investigating and fixing the issue?

- Use "FlatList" to render data instead of using map function in combination with ScrollView.
- If there are views that need to be displayed at the top of the list, use “ListHeaderComponent” instead of writing a separate view.
- Pagination of data when displayed. Use the "onEndReached" function to load more data when the user scrolls to the bottom of the data page.
- Pass "keyExtractor" as a unique value, so that FlatList knows what data is changed -> re-rendering only the changed rows without affecting other rows.
- Do not use arrow function inline for FlatList props like keyExtractor, renderItem -> this will cause the function to be recreated every time re-render.
- Avoid using images of too high quality when displaying the data list. It is recommended to use an image of the same quality and size as the interface, and display a screen with the full image size when the user clicks to view the image. Here can use “FastImage” instead of regular Image.
- Component passed to renderItem function as less complex as possible.
- If the display data of a row is too complex, can use "maxToRenderPerBatch" to reduce the number of items rendered each time scroll.
- If a row of the list has a large height, "windowSize" props can be used to reduce the number of frames stored by the FlatList (should not be used with rows that do not have a large height relative to the screen, that will cause some blank white spaces when scrolling the list very fast)
- If the rows item in your list have a fixed height, using "getItemLayout" -> FlatList will not have to recalculate the height every time the item is rendered.
- Use “initialNumToRender” to limit the number of items rendered in the first render (default is 10)
- Use useCallback for props: keyExtractor, renderItem, useMemo for render components appropriately.