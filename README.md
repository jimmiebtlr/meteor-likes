```Likes.attachBehavior( AstroCollectionName );```

Will ensure a user cannot like more than once (currently via mongo unique index).
Adds ```AstroCollectionName.like()``` and ```AstroCollectionName.unlike()```

# Aggregate counts

Updates the likesCount field on the attached collection.  This is not yet configurable.

# Pub/Sub

This package will automatically handle pub/sub.  This is likely desired behavior until users start getting large numbers of likes per person.


