exports.seed = function(knex) {
  return knex('comments').insert([
    {comment_id: 1, user_id: 1, qc_id: 1, content: 'This is a comment.', comment_date: new Date(), track_name: 'Track 1', artist_name: 'Artist 1', track_url: 'https://placeholder.com/track1', track_image_url: 'https://placeholder.com/trackimg1'},
    {comment_id: 2, user_id: 2, qc_id: 2, content: 'Another comment.', comment_date: new Date(), track_name: 'Track 2', artist_name: 'Artist 2', track_url: 'https://placeholder.com/track2', track_image_url: 'https://placeholder.com/trackimg2'},
    {comment_id: 3, user_id: 3, qc_id: 3, content: 'Yet another comment.', comment_date: new Date(), track_name: 'Track 3', artist_name: 'Artist 3', track_url: 'https://placeholder.com/track3', track_image_url: 'https://placeholder.com/trackimg3'},
    {comment_id: 4, user_id: 4, qc_id: 4, content: 'Comment again.', comment_date: new Date(), track_name: 'Track 4', artist_name: 'Artist 4', track_url: 'https://placeholder.com/track4', track_image_url: 'https://placeholder.com/trackimg4'},
    {comment_id: 5, user_id: 5, qc_id: 5, content: 'Last comment.', comment_date: new Date(), track_name: 'Track 5', artist_name: 'Artist 5', track_url: 'https://placeholder.com/track5', track_image_url: 'https://placeholder.com/trackimg5'},
    {comment_id: 6, user_id: 1, qc_id: 1, content: 'Second comment on first card.', comment_date: new Date(), track_name: 'Track 6', artist_name: 'Artist 6', track_url: 'https://placeholder.com/track6', track_image_url: 'https://placeholder.com/trackimg6'}
  ]);
};