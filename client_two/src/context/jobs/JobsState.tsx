import { useReducer } from 'react';
import axios from 'axios';
import * as Cookies from 'js-cookie';

import { ERequestOutcomes } from '../../types/errors';
import { SET_JOBS, SET_ALL_JOBS, RESET_JOBS, SHOW_WINDOW, CLOSE_WINDOW, IJobsState, EOrderJobs } from './types';

import { IJobObject } from './types';

import isDev from '../../utils/is-dev';
import { projectURLS } from '../../utils/urls';

import JobsReducer from './JobsReducer';
import JobsContext from './JobsContext';

export interface IProps {
	children: React.ReactNode;
}

const JobState = (props: IProps) => {
	const state: IJobsState = {
		jobs: [],
		jobsOriginal: [],
		showCreateWindow: false,
	};

	const [jobsState, dispatch] = useReducer(JobsReducer, state);

	const getAllJobs = async () => {
		try {
			const jobs = await axios.request({
				method: 'POST',
				withCredentials: true,
				url: isDev() ? `${projectURLS.development}/api/post/getAllJobs` : `${projectURLS.productionWithAPI}/post/getAllJobs`,
				headers: {
					authorization: `${Cookies.get('token')}`,
				},
			});

			dispatch({ type: SET_ALL_JOBS, payload: jobs.data.data.rows });
		} catch (error: any) {
			//! Just show modal, no need to return..
			return ERequestOutcomes.hasError;
		}
	};

	const deletePostByID = async (id: string) => {
		try {
			const jobDeleting = await axios.request({
				method: 'POST',
				withCredentials: true,
				url: isDev() ? `${projectURLS.development}/api/post/deleteJob` : `${projectURLS.productionWithAPI}/post/deleteJob`,
				headers: {
					authorization: `${Cookies.get('token')}`,
				},
				data: {
					jobID: id,
				},
			});

			return jobDeleting;
		} catch (error) {
			return ERequestOutcomes.hasError;
		}
	};

	const removeJobFromState = (id: string) => {
		const jobs = jobsState.jobsOriginal;
		const deleteJob = jobs.filter((job: IJobObject) => job.job_id !== id);
		dispatch({ type: SET_ALL_JOBS, payload: deleteJob });
	};

	const searchJobsByText = (text: string) => {
		if (text === '') return dispatch({ type: RESET_JOBS });
		const jobsStateJobs = jobsState.jobsOriginal.filter((jobs: IJobObject) => jobs.message.toLowerCase().includes(text.toLowerCase()));
		dispatch({ type: SET_JOBS, payload: jobsStateJobs });
	};

	const addNewJob = (job: IJobObject) => {
		dispatch({ type: SET_ALL_JOBS, payload: job });
	};

	// DIDNT GET WORKING
	// const orderJobsByField = (type: EOrderJobs) => {
	//   if (EOrderJobs.status) {
	//     const sortLetter = (a: IJobObject, b: IJobObject) => (a.status > b.status ? 1 : b.status > a.status ? -1 : 0);

	//     const sortedJobs = jobsState.jobsOriginal.sort(sortLetter);
	//     dispatch({ type: SET_JOBS, payload: sortedJobs });
	//   }

	//   if (EOrderJobs.dateasc) {
	//     const sortedDate = (a: IJobObject, b: IJobObject) =>
	//       new Date(a.date).getTime() > new Date(b.date).getTime()
	//         ? 1
	//         : new Date(b.date).getTime() > new Date(a.date).getTime()
	//         ? -1
	//         : 0;

	//     const sortedJobs = jobsState.jobsOriginal.sort(sortedDate);
	//     dispatch({ type: SET_JOBS, payload: sortedJobs });
	//   }

	//   if (EOrderJobs.datedec) {
	//     const sortedDate = (a: IJobObject, b: IJobObject) =>
	//       new Date(a.date).getTime() > new Date(b.date).getTime()
	//         ? -1
	//         : new Date(b.date).getTime() > new Date(a.date).getTime()
	//         ? 1
	//         : 0;

	//     const sortedJobs = jobsState.jobsOriginal.sort(sortedDate);
	//     dispatch({ type: SET_JOBS, payload: sortedJobs });
	//   }
	// };

	const showCreateWindow = () => {
		dispatch({ type: SHOW_WINDOW });
	};

	const closeCreateWindow = () => {
		dispatch({ type: CLOSE_WINDOW });
	};

	return (
		<JobsContext.Provider
			value={{
				jobsState,
				getAllJobs,
				deletePostByID,
				showCreateWindow,
				closeCreateWindow,
				searchJobsByText,
				removeJobFromState,
				addNewJob,
			}}
		>
			{props.children}
		</JobsContext.Provider>
	);
};

export default JobState;
