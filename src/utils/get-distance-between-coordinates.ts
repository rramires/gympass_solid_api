export interface ICoordinate {
	latitude: number
	longitude: number
}

/**
 * Returns the distance between two coordinates in kilometers
 */
export function getDistanceBetweenCoordinates(from: ICoordinate, to: ICoordinate) {
	if (from.latitude === to.latitude && from.longitude === to.longitude) {
		return 0
	}

	const fromRadian = (Math.PI * from.latitude) / 180
	const toRadian = (Math.PI * to.latitude) / 180

	const theta = from.longitude - to.longitude
	const radTheta = (Math.PI * theta) / 180

	let dist =
		Math.sin(fromRadian) * Math.sin(toRadian) +
		Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

	if (dist > 1) {
		dist = 1
	}

	dist = Math.acos(dist)
	dist = (dist * 180) / Math.PI
	dist = dist * 60 * 1.1515
	dist = dist * 1.609344

	return dist
}
