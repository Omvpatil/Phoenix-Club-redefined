import { Plane } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing';




const ImagePlane = ({ textContent }) => {
  const [textureUrl1, setTextureUrl1] = useState("../src/assets/members/NULL.png");
  const [textureUrl2, setTextureUrl2] = useState("../src/assets/members/NULL.png");

    const planeRef1 = useRef()
    const planeRef2 = useRef()
    const planePosition1 = useRef({ x: 0, y: 0, z: -1 })
    const planeRotation1 = useRef({ x: 0, y: 0, z: 0 })

    const planePosition2 = useRef({ x: 0, y: 0, z: -1 })
    const planeRotation2 = useRef({ x: 0, y: 0, z: 0 })

    const texture1 = useLoader(THREE.TextureLoader, textureUrl1);
    const texture2 = useLoader(THREE.TextureLoader, textureUrl2);  
  
    useEffect(() => {
      // Position Adjustment
      if (!planeRef1.current && !planeRef2) return
  
      let newPosition1 = { x: 0, y: 0, z: -1 }
      let newRotation1 = { x: 0, y: 0, z: 0 }

      let newPosition2 = { x: 0, y: 0, z: -1 }
      let newRotation2 = { x: 0, y: 0, z: 0 }
  
      switch (textContent) {
        case 'Presidents':
          newPosition1.y = 0.3
          newPosition1.x = -0.1
          newPosition1.z = 0.5
          newRotation1.x = -Math.PI /2

          newPosition2.y = 0.4
          newPosition2.x = 1

          setTextureUrl1('../src/assets/members/RIDDHI.png')
          setTextureUrl2('../src/assets/members/ASUS.png')
          break
        case 'Secretaries':
          newPosition1 = {x: -0.3, y: 0.4, z: -0.5}
          newPosition2 = {x: -0.3, y: 0.4, z: -0.5}

          setTextureUrl1('../src/assets/members/VIDHEE.png')
          setTextureUrl2('../src/assets/members/ARYAN.png')
          break
        case 'Treasurers':
          newPosition1 = { x: -0.56, y: -0.2, z: -0.6}
          newPosition2 = { x: -0.56, y: -0.2, z: -0.6}

          setTextureUrl1('../src/assets/members/UDAY.png')
          setTextureUrl2('../src/assets/members/ATHARVA.png')
          break
        case 'CreativeTeam':
          newPosition1 = { x: -0.7, y: 0.2, z: -0.24 }
          newRotation1.y = 0.3
          
          newPosition2 = { x: -0.7, y: 0.2, z: -0.24 }
          newRotation2.y = 0.3

          setTextureUrl1('../src/assets/members/PRATIK.png')
          setTextureUrl2('../src/assets/members/SIDDHI.png')
          break
        case 'ManagementTeam':
          newPosition1 = { x: -1, y: .2, z: 0 }
          
          newPosition2 = { x: -1, y: .2, z: 0 }
          break
        case 'TechTeam':
          newPosition1 = { x: -1, y: -0.2, z: 0.1 }
          newRotation1.y = 1.5
          
          newPosition2 = { x: -1, y: -0.2, z: 0.1 }
          newRotation2.y = 1.5

          setTextureUrl1('../src/assets/members/LULWA.png')
          setTextureUrl2('../src/assets/members/OREWA.png')
          break
      }
  // First Image
      // Animate position smoothly
      gsap.to(planePosition1.current, {
        ...newPosition1,
        duration: 2.5,
        ease: 'power2.out',
      })
  
      // Animate rotation smoothly
      gsap.to( planeRotation1.current, {
        ...newRotation1,
        duration: 3,
        ease: 'power2.out',
      })
// Second Image
      gsap.to(planePosition2.current, {
        ...newPosition2,
        duration: 2.5,
        ease: 'power2.out',
      })
  
      // Animate rotation smoothly
      gsap.to( planeRotation2.current, {
        ...newRotation2,
        duration: 3,
        ease: 'power2.out',
      })
    }, [textContent])

    useFrame(()=>{
        if (planeRef1.current) {
            planeRef1.current.position.set(
              planePosition1.current.x,
              planePosition1.current.y,
              planePosition1.current.z
            )
            planeRef1.current.rotation.set(
              planeRotation1.current.x,
              planeRotation1.current.y,
              planeRotation1.current.z
            )
          }
        if (planeRef2.current) {
            planeRef2.current.position.set(
              planePosition2.current.x,
              planePosition2.current.y,
              planePosition2.current.z
            )
            planeRef2.current.rotation.set(
              planeRotation2.current.x,
              planeRotation2.current.y,
              planeRotation2.current.z
            )
          }
    })

  return (
    <>
    <Plane ref={planeRef1} args={[0.7, 0.35]} position={[0, 0, -1]} rotation={[-Math.PI / 2, 0, 0]} castShadow >
      <meshStandardMaterial attach="material" map={texture1} transparent alphaTest={0.5} depthWrite={false}  />
    </Plane>
    <Plane ref={planeRef2} args={[0.7, 0.35]} position={[0, 0, -1]} rotation={[-Math.PI / 2, 0, 0]} castShadow >
      <meshStandardMaterial attach="material" map={texture2} transparent alphaTest={0.5} />
    </Plane>

    {/* Post Processin */}



    </>
  )
}

export default React.memo(ImagePlane)