// .vitepress/config.mjs
import { defineConfig } from "file:///sessions/keen-loving-ritchie/mnt/my-website/node_modules/vitepress/dist/node/index.js";
var config_default = defineConfig({
  title: "Mountains and Rivers",
  description: "CS Noob's personal site",
  themeConfig: {
    siteTitle: "Mountains and Rivers",
    nav: [
      { text: "Home", link: "/" },
      { text: "CS Notes", link: "/csnotes" },
      { text: "Others", link: "/others" }
    ],
    sidebar: [
      {
        text: "Study",
        items: [
          {
            text: "CS Study",
            link: "/csnotes",
            items: [
              {
                text: "Lab Notes",
                items: [
                  { text: "0413 Lab Report", link: "/lab-notes/0413lab" },
                  { text: "0420 Lab Report", link: "/lab-notes/0420lab" },
                  { text: "0525 Lab Report", link: "/lab-notes/0525lab" },
                  { text: "0601 Lab Report", link: "/lab-notes/0601lab" }
                ]
              },
              {
                text: "Linux",
                items: [
                  { text: "Hello Linux", link: "/linux/HelloLinux" },
                  { text: "Linux commands", link: "/linux/Linux_commands" },
                  { text: "gdb x command", link: "/linux/gdb_x_command" },
                  { text: "Bomb Lab Related", link: "/linux/Bomb_Lab_Related" },
                  { text: "Bomb Lab", link: "/linux/Bomb_Lab" },
                  { text: "Attack Lab", link: "/linux/Attack_Lab" }
                ]
              }
            ]
          }
        ]
      },
      {
        text: "Interests",
        items: [
          { text: "GeoGuessr", link: "/interests/geoguessr" }
        ]
      },
      {
        text: "Misc",
        items: [
          { text: "Others", link: "/others" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/LuanJiangXing" }
    ]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Nlc3Npb25zL2tlZW4tbG92aW5nLXJpdGNoaWUvbW50L215LXdlYnNpdGUvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Nlc3Npb25zL2tlZW4tbG92aW5nLXJpdGNoaWUvbW50L215LXdlYnNpdGUvLnZpdGVwcmVzcy9jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9zZXNzaW9ucy9rZWVuLWxvdmluZy1yaXRjaGllL21udC9teS13ZWJzaXRlLy52aXRlcHJlc3MvY29uZmlnLm1qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgdGl0bGU6ICdNb3VudGFpbnMgYW5kIFJpdmVycycsXG4gIGRlc2NyaXB0aW9uOiBcIkNTIE5vb2IncyBwZXJzb25hbCBzaXRlXCIsXG5cbiAgdGhlbWVDb25maWc6IHtcbiAgICBzaXRlVGl0bGU6ICdNb3VudGFpbnMgYW5kIFJpdmVycycsXG5cbiAgICBuYXY6IFtcbiAgICAgIHsgdGV4dDogJ0hvbWUnLCBsaW5rOiAnLycgfSxcbiAgICAgIHsgdGV4dDogJ0NTIE5vdGVzJywgbGluazogJy9jc25vdGVzJyB9LFxuICAgICAgeyB0ZXh0OiAnT3RoZXJzJywgbGluazogJy9vdGhlcnMnIH1cbiAgICBdLFxuXG4gICAgc2lkZWJhcjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnU3R1ZHknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDUyBTdHVkeScsXG4gICAgICAgICAgICBsaW5rOiAnL2Nzbm90ZXMnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdMYWIgTm90ZXMnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICcwNDEzIExhYiBSZXBvcnQnLCBsaW5rOiAnL2xhYi1ub3Rlcy8wNDEzbGFiJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnMDQyMCBMYWIgUmVwb3J0JywgbGluazogJy9sYWItbm90ZXMvMDQyMGxhYicgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJzA1MjUgTGFiIFJlcG9ydCcsIGxpbms6ICcvbGFiLW5vdGVzLzA1MjVsYWInIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICcwNjAxIExhYiBSZXBvcnQnLCBsaW5rOiAnL2xhYi1ub3Rlcy8wNjAxbGFiJyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnTGludXgnLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnSGVsbG8gTGludXgnLCBsaW5rOiAnL2xpbnV4L0hlbGxvTGludXgnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0xpbnV4IGNvbW1hbmRzJywgbGluazogJy9saW51eC9MaW51eF9jb21tYW5kcycgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnZ2RiIHggY29tbWFuZCcsIGxpbms6ICcvbGludXgvZ2RiX3hfY29tbWFuZCcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnQm9tYiBMYWIgUmVsYXRlZCcsIGxpbms6ICcvbGludXgvQm9tYl9MYWJfUmVsYXRlZCcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnQm9tYiBMYWInLCBsaW5rOiAnL2xpbnV4L0JvbWJfTGFiJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdBdHRhY2sgTGFiJywgbGluazogJy9saW51eC9BdHRhY2tfTGFiJyB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdJbnRlcmVzdHMnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0dlb0d1ZXNzcicsIGxpbms6ICcvaW50ZXJlc3RzL2dlb2d1ZXNzcicgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnTWlzYycsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnT3RoZXJzJywgbGluazogJy9vdGhlcnMnIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0sXG5cbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAgeyBpY29uOiAnZ2l0aHViJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9MdWFuSmlhbmdYaW5nJyB9XG4gICAgXSxcblxuICB9XG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1UsU0FBUyxvQkFBb0I7QUFFNVcsSUFBTyxpQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBRWIsYUFBYTtBQUFBLElBQ1gsV0FBVztBQUFBLElBRVgsS0FBSztBQUFBLE1BQ0gsRUFBRSxNQUFNLFFBQVEsTUFBTSxJQUFJO0FBQUEsTUFDMUIsRUFBRSxNQUFNLFlBQVksTUFBTSxXQUFXO0FBQUEsTUFDckMsRUFBRSxNQUFNLFVBQVUsTUFBTSxVQUFVO0FBQUEsSUFDcEM7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMLEVBQUUsTUFBTSxtQkFBbUIsTUFBTSxxQkFBcUI7QUFBQSxrQkFDdEQsRUFBRSxNQUFNLG1CQUFtQixNQUFNLHFCQUFxQjtBQUFBLGtCQUN0RCxFQUFFLE1BQU0sbUJBQW1CLE1BQU0scUJBQXFCO0FBQUEsa0JBQ3RELEVBQUUsTUFBTSxtQkFBbUIsTUFBTSxxQkFBcUI7QUFBQSxnQkFDeEQ7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNJLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0wsRUFBRSxNQUFNLGVBQWUsTUFBTSxvQkFBb0I7QUFBQSxrQkFDakQsRUFBRSxNQUFNLGtCQUFrQixNQUFNLHdCQUF3QjtBQUFBLGtCQUN4RCxFQUFFLE1BQU0saUJBQWlCLE1BQU0sdUJBQXVCO0FBQUEsa0JBQ3RELEVBQUUsTUFBTSxvQkFBb0IsTUFBTSwwQkFBMEI7QUFBQSxrQkFDNUQsRUFBRSxNQUFNLFlBQVksTUFBTSxrQkFBa0I7QUFBQSxrQkFDNUMsRUFBRSxNQUFNLGNBQWMsTUFBTSxvQkFBb0I7QUFBQSxnQkFDbEQ7QUFBQSxjQUNKO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNMLEVBQUUsTUFBTSxhQUFhLE1BQU0sdUJBQXVCO0FBQUEsUUFDcEQ7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsRUFBRSxNQUFNLFVBQVUsTUFBTSxVQUFVO0FBQUEsUUFDcEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsYUFBYTtBQUFBLE1BQ1gsRUFBRSxNQUFNLFVBQVUsTUFBTSxtQ0FBbUM7QUFBQSxJQUM3RDtBQUFBLEVBRUY7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
