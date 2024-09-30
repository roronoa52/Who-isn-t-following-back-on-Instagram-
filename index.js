import express from 'express';
import following from './following.json' assert { type: 'json' };
import followers from './followers.json' assert { type: 'json' };

const app = express();
const port = 3000;

app.get('/not-following-back', (req, res) => {
    const followerValues = new Set(
        followers.flatMap(follower => 
            follower.string_list_data.map(data => data.value)
        )
    );

    const notFollowingBack = following.relationships_following.flatMap(relationship => 
        relationship.string_list_data
            .filter(data => !followerValues.has(data.value))
            .map(data => ({
                username: data.value,
                url: data.href,
                timestamp: data.timestamp
            }))
    );

    res.json(notFollowingBack);
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
