const collection = new Mongo.Collection('likes');

collection.allow({
  insert(userId, doc) {
    return doc.userId === userId;
  },
  remove(userId, doc) {
    return doc.userId === userId;
  },
});

const Likes = Astro.Class({
  name: 'Likes',
  collection,
  fields: {
    userId: {
      type: 'string',
      immutable: true,
      default() {
        return Meteor.userId();
      }
    },
    relatedType: {
      type: 'string',
      immutable: true,
    },
    relatedId: {
      type: 'string',
    },
  },
});

if (Meteor.isServer) {
  collection._ensureIndex({ userId: 1 });
  collection._ensureIndex({
    userId: 1,
    relatedType: 1,
    relatedId: 1
  }, {
    unique: true
  });
}

/*
 * Handle updating any attached collections aggregate fields
 */
const collections = {};
Likes.attachBehavior = ( model ) => {
  collections[model.getName()] = model;

  model.extend({
    methods: {
      like() {
        const like = new Likes();
        like.set({ relatedType: model.getName(), relatedId: this._id });
        like.save();
      },
      unlike() {
        const like = Likes.findOne({
          relatedType: model.getName(),
          relatedId: this._id,
          userId: Meteor.userId(),
        });
        like.remove();
      },
    },
    fields: {
      likesCount: {
        type: 'number',
        default() {
          return 0;
        },
      },
    },
  });
};

if (Meteor.isServer) {
  collection.after.insert((userId, doc) => {
    const collection = collections[doc.relatedType];

    if (!collection) {
      console.warn(`like with type that wasnt attached found. ${doc.relatedType}`);
      return;
    }

    collection.update({ _id: doc.relatedId }, {$inc: {likesCount: 1} });
  });
  collection.after.remove((userId, doc) => {
    const collection = collections[doc.relatedType];

    if (!collection) {
      console.warn(`like with type that wasnt attached found. ${doc.relatedType}`);
      return;
    }

    collection.update({ _id: doc.relatedId }, {$inc: {likesCount: -1} });
  });
}


export { Likes };
