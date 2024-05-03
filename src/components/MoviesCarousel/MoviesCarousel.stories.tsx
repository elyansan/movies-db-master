import { Meta, StoryFn } from '@storybook/react';
import MoviesCarousel from './MoviesCarousel';
import { movies } from '../../constants/moviesMock';
import React from 'react';

const meta = {
    title: 'Components/MoviesCarousel',
    component: MoviesCarousel,
    parameters: {
        docs: {
            description: {
                component: 'A default moviecard carousel that displays a list of movie cards.',
            },
        },
    },
    argTypes: {
        movies: { control: 'object' },
    },
    tags: ["autodocs"]
} as Meta;

export default meta;

const Template: StoryFn<any> = (args) => <MoviesCarousel movies={args.movies} />;

const moviesList = movies.slice(0, 10).map((movie, index) => ({
    ...movie,
    key: index,
}));  

export const MovieCardCarousel = Template.bind({});
MovieCardCarousel.args = {
    movies: moviesList,
};
