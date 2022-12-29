import { useEffect, useState } from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import './index.css';

const LayoutSegment = ({ items, onChange }) => {
	const { data, loading } = items;
	const [activeTab, setActiveTab] = useState();

	useEffect(() => {
		if (!loading) {
			setActiveTab(data[0].id);
		}
	}, [data.length, loading]);

	return loading ? (
		<IonSegment scrollable key="tab-loading">
			<IonSegmentButton key="1">
				<span className="placeholder col-7"></span>
			</IonSegmentButton>
			<IonSegmentButton key="2">
				<span className="placeholder col-7"></span>
			</IonSegmentButton>
			<IonSegmentButton key="3">
				<span className="placeholder col-7"></span>
			</IonSegmentButton>
			<IonSegmentButton key="4">
				<span className="placeholder col-7"></span>
			</IonSegmentButton>
		</IonSegment>
	) : (
		<IonSegment
			scrollable
			value={activeTab}
			onIonChange={(e) => {
				onChange(e.detail.value);
				setActiveTab(e.detail.value);
			}}
			key="tab-loaded"
		>
			{data.length > 0 &&
				data.map((item, index) => {
					return (
						<IonSegmentButton value={item.id} key={item.id}>
							<IonLabel>{item.title}</IonLabel>
						</IonSegmentButton>
					);
				})}
		</IonSegment>
	);
};

LayoutSegment.defaultProps = {
	tabItems: [],
};

export default LayoutSegment;
