import React from 'react'

const NoCourses = () => {
    return (
        <>
            <div >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }} >
                    <div style={{
                        textAlign: 'center', fontWeight: '600'
                    }}>
                        <span
                            style={{
                                fontSize: '20px',
                                opacity: '0.3'
                            }}
                        >
                            No Courses Found in this Category
                        </span>
                    </div>
                    <img
                        style={{
                            opacity: '0.3',
                            width: '230px'
                        }}
                        src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
                        alt="No Course Found svg"
                    />
                </div>
            </div>
        </>
    )
}

export default NoCourses