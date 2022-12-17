import { getByText, render, screen, waitFor, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Article from '../Article';
import api from '../../config/axios';

jest.mock('../../config/axios');
beforeEach(() => jest.clearAllMocks());

it('Article Page', async () => {
	const matchProps = { params: { id: 18 } };

	const fakeResp = {
		data: {
			success: true,
			message: null,
			messages: null,
			data: {
				id: 18,
				title: 'This Is My Brain on Chantix',
				alias: 'this-is-my-brain-on-chantix',
				introtext:
					'<p>Chantix is a pill that decreases the pleasurable effects of cigarettes. It also causes hallucinations, suicidal thoughts and waking nightmares:</p>',
				state: 1,
				catid: 11,
				created: '2022-09-08 02:35:54',
				images:
					'{"image_intro":"images\\/landscape_ebf3f2406878df050e93d7d502778b2b_640x346.jpeg#joomlaImage:\\/\\/local-images\\/landscape_ebf3f2406878df050e93d7d502778b2b_640x346.jpeg?width=800&height=250","image_intro_alt":"","float_intro":"","image_intro_caption":"","image_fulltext":"","image_fulltext_alt":"","float_fulltext":"","image_fulltext_caption":""}',
			},
		},
	};

	api.get.mockResolvedValueOnce(fakeResp);
	// const axiosSpy = jest.spyOn(api, 'get');

	expect(screen.getByTestId('article-loading')).toBeInTheDocument();
	await waitFor(() => {
		expect(screen.getByTestId('article-loaded')).toBeInTheDocument();
	});

	render(<Article match={matchProps} />);

	// expect(getByTestId('article-loading').firstChild).toHaveClass('article-image-full');
	// expect(listNode.children).toHaveLength(1);
	expect(api.get).toHaveBeenCalledTimes(1);
	expect(screen.getByText(/This Is My Brain on Chantix/i)).toBeInTheDocument();
});
