# Snacks & Scripts Website

A clean, modern one-page website for showcasing scripts in various programming languages, with email collection functionality using Supabase.

## Quick Setup

### Setting up the Supabase Table

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project (bycgbwvfkyoaksniehhv)
3. Go to the SQL Editor
4. Copy and paste the SQL from `create_subscribers_table.sql`
5. Run the SQL query

### How it Works

- Users enter their email and click submit
- Email is stored in your Supabase database
- Users are redirected to GitHub profile

## Customization

- Edit `index.html` to update content
- Modify `styles.css` for design changes
- Adjust `script.js` for functionality changes

## Files

- `index.html` - Main website HTML
- `styles.css` - Styling for the website
- `script.js` - JavaScript functionality and form handling
- `favicon.svg` - Website icon
- `create_subscribers_table.sql` - SQL table setup script

## Features

- Clean black and white design
- Mobile-responsive layout
- Email collection with GitHub redirect
- Featured scripts section with language tags
- Programming languages showcase section

## License

MIT 