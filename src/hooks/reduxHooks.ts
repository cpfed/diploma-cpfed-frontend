import {
	useSelector,
	useDispatch,
	TypedUseSelectorHook,
} from 'react-redux';

import {
	RootState,
	AppDispatch,
} from '@/store'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
