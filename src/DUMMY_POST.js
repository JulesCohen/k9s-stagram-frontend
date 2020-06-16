const DUMMY_POSTS = [
  {
    id: "u1",
    name: "julescohen",
    firstName: "Jules",
    lastName: "Cohen",
    location: "Montreal, Canada",
    image:
      "https://scontent-lht6-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/97281412_531863747506878_6042020739372776124_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&_nc_cat=106&_nc_ohc=UVdwysK3t0MAX8kvxKO&oh=7a9d0830d300cbc09cb70ab4e03519a3&oe=5F0BC816&ig_cache_key=MjMxMjI1NjAwMjk2Njk4OTk4OQ%3D%3D.2",
    // image: "https://k9stragram.s3.us-east-2.amazonaws.com/images/mr.jpg",
    likes: 7,
    text: "Yé regarde vers l'avenir!!",
    hashtags: "#pinscher #doglife",
    comments: [
      {
        author: "nicco12",
        comment: "Trop beau celui la! :)",
      },
    ],
  },
  {
    id: "u1",
    name: "julescohen",
    firstName: "Jules",
    lastName: "Cohen",
    location: "Montreal, Canada",
    image:
      "https://scontent.fymq2-1.fna.fbcdn.net/v/t1.0-9/65536355_10157078253581675_2979088538840072192_o.jpg?_nc_cat=105&_nc_sid=05277f&_nc_ohc=V5Zpu_GKSdcAX94ONrj&_nc_ht=scontent.fymq2-1.fna&oh=86a516470af7d6c540e0e70e8797b3a2&oe=5F00D82A",
    likes: 16,
    text: "They're so cute!!",
    hashtags: "#pinscher #doglife #chihuahua",
    comments: [
      {
        author: "nicco12",
        comment: "Amazing pic! :)",
      },
    ],
  },
  {
    id: "u1",
    name: "julescohen",
    firstName: "Jules",
    lastName: "Cohen",
    location: "Montreal, Canada",
    image:
      "https://scontent.fymq2-1.fna.fbcdn.net/v/t1.0-9/53618325_10156823673116675_584088085940142080_o.jpg?_nc_cat=110&_nc_sid=05277f&_nc_ohc=7Q0xQcSzZWUAX-Iy2KC&_nc_ht=scontent.fymq2-1.fna&oh=2390b14f5d6f0907588d180d3a77a609&oe=5F00170F",
    likes: 42,
    text: "L'aventurier!!",
    hashtags: "#neige #montreal #dog #pinscher #bodeguero",
    comments: [],
  },
  {
    id: "u2",
    name: "nicco12",
    firstName: "Nicco",
    lastName: "De Rota",
    location: "Montreal, Canada",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
    likes: 23,
    text: "Look at my puppy!!",
    hashtags: "#puppy #doglife",
    comments: [],
  },
];

export default DUMMY_POSTS;
